"""Отправка письма обратной связи с сайта на почту владельца"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    contact = body.get("contact", "").strip()
    message = body.get("message", "").strip()

    if not name or not contact:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Заполните имя и контакт"}),
        }

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    from_email = "7312007@mail.ru"
    to_email = "7312007@mail.ru"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка с сайта от {name}"
    msg["From"] = from_email
    msg["To"] = to_email

    text = f"Имя: {name}\nКонтакт: {contact}\nСообщение: {message}"
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 500px;">
      <h2 style="color: #5c3317;">Новая заявка с сайта</h2>
      <p><b>Имя:</b> {name}</p>
      <p><b>Контакт:</b> {contact}</p>
      <p><b>Сообщение:</b> {message or '—'}</p>
    </div>
    """

    msg.attach(MIMEText(text, "plain", "utf-8"))
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP("smtp.mail.ru", 587, timeout=20) as server:
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True}),
    }