from django.core.mail import send_mail

def send_notification_email(user, subject, message):
    send_mail(
        subject,
        message,
        'no-reply@yourdomain.com',  # or settings.DEFAULT_FROM_EMAIL
        [user.email],
        fail_silently=False,
    )