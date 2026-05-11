from django.db import models
from django.utils.text import slugify


class About(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    bio = models.TextField()
    profile_image = models.ImageField(upload_to='about/', blank=True, null=True)
    profile_image_url = models.URLField(blank=True, help_text='URL externe (Cloudinary, etc.) — utilisée si aucune image locale')
    cv_file = models.FileField(upload_to='cv/', blank=True, null=True)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    location = models.CharField(max_length=100, blank=True)
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)

    class Meta:
        verbose_name = 'À propos'
        verbose_name_plural = 'À propos'

    def __str__(self):
        return self.name


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('dev', 'Développement'),
        ('data', 'Data & ML'),
        ('ia', 'IA & Automatisation'),
        ('tools', 'Outils'),
        ('languages', 'Langages'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    level = models.PositiveIntegerField(help_text='Niveau en % (0-100)')
    icon = models.CharField(max_length=50, blank=True, help_text='Classe CSS devicon ou emoji')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['category', 'order', 'name']
        verbose_name = 'Compétence'
        verbose_name_plural = 'Compétences'

    def __str__(self):
        return f'{self.name} ({self.get_category_display()})'


class Project(models.Model):
    CATEGORY_CHOICES = [
        ('dev', 'Développement Web'),
        ('data', 'Data Science'),
        ('ia', 'Intelligence Artificielle'),
        ('academic', 'Académique'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    short_description = models.CharField(max_length=300)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    tech_stack = models.CharField(max_length=300, help_text='Technologies séparées par des virgules')
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    github_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)
    report_pdf = models.FileField(upload_to='projects/reports/', blank=True, null=True, help_text='Rapport PDF du projet')
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Projet'
        verbose_name_plural = 'Projets'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_tech_list(self):
        return [t.strip() for t in self.tech_stack.split(',') if t.strip()]

    def get_main_image(self):
        """Retourne l'URL de l'image principale (cover ou première image de la galerie)."""
        cover = self.images.filter(is_cover=True).first()
        if cover:
            return cover.image.url
        first = self.images.first()
        if first:
            return first.image.url
        if self.image:
            return self.image.url
        return None


class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    is_cover = models.BooleanField(default=False, help_text='Image principale affichée sur les cartes')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Image du projet'
        verbose_name_plural = 'Images du projet'

    def __str__(self):
        return f'{self.project.title} — image {self.order + 1}'

    def save(self, *args, **kwargs):
        # Une seule image cover par projet
        if self.is_cover:
            ProjectImage.objects.filter(project=self.project, is_cover=True).exclude(pk=self.pk).update(is_cover=False)
        super().save(*args, **kwargs)


class Experience(models.Model):
    TYPE_CHOICES = [
        ('job', 'Expérience professionnelle'),
        ('project', 'Projet'),
        ('academic', 'Formation'),
    ]

    title = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)
    exp_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    start_date = models.CharField(max_length=50)
    end_date = models.CharField(max_length=50, blank=True, default='Présent')
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Expérience'
        verbose_name_plural = 'Expériences'

    def __str__(self):
        return f'{self.title} — {self.organization}'


class Education(models.Model):
    degree = models.CharField(max_length=200)
    school = models.CharField(max_length=200)
    period = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Formation'
        verbose_name_plural = 'Formations'

    def __str__(self):
        return f'{self.degree} — {self.school}'


class Certification(models.Model):
    name = models.CharField(max_length=200)
    issuer = models.CharField(max_length=100)
    date = models.CharField(max_length=50, blank=True)
    credential_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Certification'
        verbose_name_plural = 'Certifications'

    def __str__(self):
        return f'{self.name} — {self.issuer}'


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Message de contact'
        verbose_name_plural = 'Messages de contact'

    def __str__(self):
        return f'{self.name} — {self.subject}'
