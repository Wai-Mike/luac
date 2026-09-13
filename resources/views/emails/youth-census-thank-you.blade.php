<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you for registering with LAYYA</title>
</head>
<body style="margin:0;padding:0;background:#f3f7f7;font-family:Georgia,'Times New Roman',serif;color:#0c1f1f;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f7f7;padding:28px 12px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:580px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #d5e4e4;">
                    <tr>
                        <td style="background:#003838;padding:32px 24px 28px;text-align:center;">
                            <img
                                src="{{ isset($message) && file_exists($logoPath) ? $message->embed($logoPath) : $logoUrl }}"
                                alt="Luac Akook Yieu Youth Association"
                                width="88"
                                height="88"
                                style="display:block;margin:0 auto 16px;width:88px;height:88px;border-radius:50%;border:3px solid #c9b15c;object-fit:cover;background:#ffffff;"
                            >
                            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;color:#ffffff;font-size:22px;line-height:1.3;font-weight:700;">
                                Luac Akook Yieu Youth Association
                            </p>
                            <p style="margin:8px 0 0;font-family:'Segoe UI',Tahoma,sans-serif;color:#c9b15c;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">
                                LAYYA · Youth census
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:32px 28px 12px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
                            <p style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.3;color:#003838;">
                                Dear {{ $firstName }},
                            </p>
                            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1f3333;">
                                Thank you for taking the time to register in the LAYYA youth census. By sharing your name, your payam, and the work you do, you have helped us see Luac youth more clearly — in Belawic, Wunlem, and Mareng.
                            </p>
                            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1f3333;">
                                Your voice matters. This census is how we plan trainings, mentorship, and community programs that fit the real lives of our young people.
                            </p>
                            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1f3333;">
                                We will keep your information with care. If an opportunity arises that matches your skills, studies, or interests, we will reach out to you.
                            </p>
                            <p style="margin:0 0 8px;font-size:16px;line-height:1.7;color:#1f3333;">
                                Until then, walk with us. LAYYA is stronger because you are counted.
                            </p>
                            <p style="margin:24px 0 0;font-size:16px;line-height:1.7;color:#003838;">
                                With respect and gratitude,<br>
                                <strong>The LAYYA team</strong><br>
                                <span style="color:#5a7474;font-size:14px;">Luac Akook Yieu Youth Association</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:20px 28px 32px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
                            <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#5a7474;">
                                Questions? Write to us at
                                <a href="mailto:{{ $contactEmail }}" style="color:#003838;font-weight:600;text-decoration:none;">{{ $contactEmail }}</a>.
                            </p>
                            <p style="margin:0;font-size:12px;line-height:1.6;color:#7a9090;">
                                This message was sent because you registered on the LAYYA youth census form.
                                If you did not register, you may ignore this email.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
