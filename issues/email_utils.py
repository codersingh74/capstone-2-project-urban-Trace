from django.core.mail import send_mail
from django.conf import settings

def send_issue_report_email(issue):
    """
    Issue submit hone pe professional email bhejo.
    """

    category_labels = {
        'road': '🛣️ Road Damage',
        'sanitation': '🗑️ Sanitation Issue',
        'electricity': '⚡ Electricity Problem',
        'water': '💧 Water Supply Issue',
    }
    category_display = category_labels.get(issue.category, issue.category.title())

    subject = f"[UrbanTrace] New Issue Reported — {category_display} | #{issue.id}"

    message = f"""
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        URBAN TRACE — ISSUE ALERT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A new civic issue has been submitted and requires attention.

─── ISSUE DETAILS ───────────────────

  Issue ID    :  #{issue.id}
  Title       :  {issue.title}
  Category    :  {category_display}
  Status      :  Pending Review
  Reported At :  {issue.created_at.strftime("%d %B %Y, %I:%M %p")}

─── DESCRIPTION ─────────────────────

  {issue.description}

─── LOCATION ────────────────────────

  Latitude    :  {issue.latitude}
  Longitude   :  {issue.longitude}

  View on Map :
  https://www.google.com/maps?q={issue.latitude},{issue.longitude}

─── ACTION REQUIRED ─────────────────

  Please review and assign this issue to the concerned department
  at the earliest to avoid further inconvenience to citizens.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated alert from UrbanTrace Civic Portal.
Do not reply to this email.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""

    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.REPORT_RECIPIENT_EMAIL],
            fail_silently=False,
        )
        print(f"✅ Email sent for Issue #{issue.id}")
    except Exception as e:
        print(f"❌ Email failed for Issue #{issue.id}: {e}")