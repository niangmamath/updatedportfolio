from django.contrib import admin
from django.utils.html import format_html
from .models import About, Skill, Project, ProjectImage, Experience, Education, Certification, ContactMessage


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 3
    fields = ('image', 'preview', 'caption', 'is_cover', 'order')
    readonly_fields = ('preview',)
    ordering = ('order',)

    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="height:70px;width:100px;object-fit:cover;border-radius:6px;"/>',
                obj.image.url
            )
        return '—'
    preview.short_description = 'Aperçu'


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'email', 'location')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'level', 'order')
    list_editable = ('level', 'order')
    list_filter = ('category',)
    ordering = ('category', 'order')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'featured', 'order', 'image_count', 'has_report')
    list_editable = ('featured', 'order')
    list_filter = ('category', 'featured')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'description')
    inlines = [ProjectImageInline]

    def has_report(self, obj):
        if obj.report_pdf:
            return format_html('<span style="color:#10b981;font-weight:600">{}</span>', '✓ PDF')
        return format_html('<span style="color:#d1d5db;">{}</span>', '—')
    has_report.short_description = 'Rapport'

    def image_count(self, obj):
        count = obj.images.count()
        return format_html('<span style="color:#3b82f6;font-weight:600">{} 🖼</span>', count)
    image_count.short_description = 'Images'


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ('project', 'preview_thumb', 'caption', 'is_cover', 'order')
    list_editable = ('is_cover', 'order')
    list_filter = ('project', 'is_cover')
    readonly_fields = ('preview_thumb',)

    def preview_thumb(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="height:60px;width:90px;object-fit:cover;border-radius:6px;"/>',
                obj.image.url
            )
        return '—'
    preview_thumb.short_description = 'Aperçu'


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'organization', 'exp_type', 'start_date', 'end_date', 'order')
    list_editable = ('order',)
    list_filter = ('exp_type',)


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'school', 'period', 'order')
    list_editable = ('order',)


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('name', 'issuer', 'date', 'order')
    list_editable = ('order',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_read')
    list_editable = ('is_read',)
    list_filter = ('is_read',)
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')


admin.site.site_header = 'Portfolio — Administration'
admin.site.site_title = 'Portfolio Admin'
admin.site.index_title = 'Tableau de bord'
