import logging

from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.http import HttpResponse, Http404
import requests as _requests
from .models import About, Skill, Project, Experience, Education, Certification, ContactMessage

logger = logging.getLogger(__name__)

CATEGORY_META = {
    'dev':       {'emoji': '💻', 'border': 'border-t-blue-500',   'badge': 'badge-primary',   'bg': 'bg-blue-50'},
    'data':      {'emoji': '📊', 'border': 'border-t-green-500',  'badge': 'badge-success',   'bg': 'bg-green-50'},
    'ia':        {'emoji': '🤖', 'border': 'border-t-purple-500', 'badge': 'badge-secondary', 'bg': 'bg-purple-50'},
    'tools':     {'emoji': '🛠️', 'border': 'border-t-amber-500',  'badge': 'badge-warning',   'bg': 'bg-amber-50'},
    'languages': {'emoji': '🌐', 'border': 'border-t-cyan-500',   'badge': 'badge-info',      'bg': 'bg-cyan-50'},
}

PROJECT_EMOJI = {'dev': '💻', 'data': '📊', 'ia': '🤖', 'academic': '🎓'}


def home(request):
    about = About.objects.first()
    featured_projects = Project.objects.filter(featured=True)[:4]
    experiences = Experience.objects.all()
    educations = Education.objects.all()
    certifications = Certification.objects.all()

    skills_by_category = {}
    for skill in Skill.objects.all():
        cat = skill.category
        if cat not in skills_by_category:
            meta = CATEGORY_META.get(cat, {'emoji': '⭐', 'border': 'border-t-gray-400', 'badge': 'badge-neutral', 'bg': 'bg-gray-50'})
            skills_by_category[cat] = {
                'display': skill.get_category_display(),
                **meta,
                'skills': [],
            }
        skills_by_category[cat]['skills'].append(skill)

    context = {
        'about': about,
        'featured_projects': featured_projects,
        'skills_by_category': skills_by_category,
        'experiences': experiences,
        'educations': educations,
        'certifications': certifications,
        'project_emoji': PROJECT_EMOJI,
    }
    return render(request, 'portfolio/home.html', context)


def projects(request):
    category = request.GET.get('category', 'all')
    all_projects = Project.objects.all()
    if category != 'all':
        all_projects = all_projects.filter(category=category)

    context = {
        'projects': all_projects,
        'categories': Project.CATEGORY_CHOICES,
        'active_category': category,
        'project_emoji': PROJECT_EMOJI,
    }
    return render(request, 'portfolio/projects.html', context)


def project_detail(request, slug):
    project = get_object_or_404(Project, slug=slug)
    related = Project.objects.filter(category=project.category).exclude(pk=project.pk)[:3]
    context = {'project': project, 'related': related, 'project_emoji': PROJECT_EMOJI}
    return render(request, 'portfolio/project_detail.html', context)


def _fetch_cloudinary_pdf(report_pdf):
    """Récupère le PDF depuis Cloudinary. Essaie l'URL directe, puis signée."""
    candidates = []

    direct_url = report_pdf.url
    candidates.append(('direct', direct_url))

    try:
        import cloudinary.utils
        public_id = 'media/' + report_pdf.name
        signed_url, _ = cloudinary.utils.cloudinary_url(
            public_id,
            resource_type='raw',
            type='upload',
            sign_url=True,
        )
        candidates.append(('signed', signed_url))
    except Exception as e:
        logger.warning('Cloudinary signed URL generation failed: %s', e)

    last_error = None
    for label, url in candidates:
        try:
            resp = _requests.get(url, timeout=30)
            resp.raise_for_status()
            return resp.content
        except Exception as e:
            last_error = e
            logger.warning('PDF fetch via %s URL failed (%s): %s', label, url, e)

    raise Http404(f'PDF Cloudinary inaccessible: {last_error}')


def pdf_proxy(request, slug):
    project = get_object_or_404(Project, slug=slug)
    if not project.report_pdf:
        raise Http404('Aucun rapport PDF associé à ce projet')

    url = project.report_pdf.url
    if url.startswith('http'):
        content = _fetch_cloudinary_pdf(project.report_pdf)
    else:
        try:
            with project.report_pdf.open('rb') as f:
                content = f.read()
        except Exception as e:
            logger.exception('Lecture PDF local échouée: %s', e)
            raise Http404('Fichier PDF introuvable')

    return HttpResponse(
        content,
        content_type='application/pdf',
        headers={
            'Content-Disposition': 'inline; filename="rapport.pdf"',
            'Content-Length': str(len(content)),
        },
    )


def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        subject = request.POST.get('subject', '').strip()
        message = request.POST.get('message', '').strip()

        if name and email and subject and message:
            ContactMessage.objects.create(name=name, email=email, subject=subject, message=message)

            try:
                send_mail(
                    subject=f'[Portfolio] {subject}',
                    message=(
                        f'Nouveau message de contact reçu sur ton portfolio.\n\n'
                        f'De : {name} <{email}>\n'
                        f'Sujet : {subject}\n\n'
                        f'Message :\n{message}\n\n'
                        f'---\nTu peux répondre directement à {email}'
                    ),
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.CONTACT_RECIPIENT_EMAIL],
                    fail_silently=False,
                )
            except Exception:
                pass

            messages.success(request, 'Message envoyé ! Je vous répondrai rapidement.')
            return redirect('contact')
        else:
            messages.error(request, 'Veuillez remplir tous les champs.')

    about = About.objects.first()
    return render(request, 'portfolio/contact.html', {'about': about})
