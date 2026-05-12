import cloudinary
import cloudinary.uploader
import os

cloudinary.config(
    cloud_name='dlqwxsufy',
    api_key='928972734729282',
    api_secret='basUOTmH68BIaWUpqAuZ6xkIqF4',
)

media_root = os.path.join(os.path.dirname(__file__), 'media')

for dirpath, dirnames, filenames in os.walk(media_root):
    for filename in filenames:
        filepath = os.path.join(dirpath, filename)
        relative = os.path.relpath(filepath, media_root).replace(os.sep, '/')
        # django-cloudinary-storage prepend "media/" to stored paths
        public_id_with_ext = 'media/' + relative
        public_id = os.path.splitext(public_id_with_ext)[0]
        result = cloudinary.uploader.upload(
            filepath,
            public_id=public_id,
            resource_type='raw',
            overwrite=True,
        )
        print('OK:', public_id, '->', result['secure_url'])
