@php
    $logoSrc = (isset($message) && ! empty($logoPath) && is_file($logoPath))
        ? $message->embed($logoPath)
        : $logoUrl;
@endphp
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for registering</title>
</head>
<body style="margin:0;padding:0;background:#F4F7F6;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#172321;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F4F7F6;padding:28px 12px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:580px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #DDE7E4;">
                    <tr>
                        <td style="background:#073B3A;padding:28px 24px 24px;text-align:center;">
                            @if ($logoSrc)
                                <img
                                    src="{{ $logoSrc }}"
                                    alt="Luac Akook Yieu Youth Association"
                                    width="88"
                                    height="88"
                                    style="display:block;margin:0 auto 14px;width:88px;height:88px;border-radius:50%;border:2px solid #D5A742;object-fit:cover;background:#ffffff;"
                                >
                            @endif
                            <p style="margin:0;color:#ffffff;font-size:20px;line-height:1.3;font-weight:700;">
                                Luac Akook Yieu Youth Association
                            </p>
                            <p style="margin:8px 0 0;color:#D5A742;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;">
                                LAYYA · Youth census
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:32px 28px 8px;">
                            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#172321;">
                                Dear {{ $firstName }},
                            </p>
                            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#172321;">
                                Thank you for registering. This data will help LAYYA plan and share relevant opportunities.
                            </p>
                            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#172321;">
                                Thank You for registering.
                            </p>
                            <p style="margin:0 0 8px;font-size:16px;line-height:1.7;color:#172321;">
                                For general information regarding our programs, upcoming youth events, and community initiatives, please visit our website at
                                <a href="{{ $websiteUrl }}" style="color:#073B3A;font-weight:600;text-decoration:underline;">{{ $websiteDisplay }}</a>.
                            </p>
                            <table role="presentation" cellspacing="0" cellpadding="0" style="margin:28px 0 0;">
                                <tr>
                                    <td style="vertical-align:top;padding-right:12px;">
                                        @if ($logoSrc)
                                            <img
                                                src="{{ $logoSrc }}"
                                                alt="LAYYA logo"
                                                width="52"
                                                height="52"
                                                style="display:block;width:52px;height:52px;border-radius:50%;border:2px solid #D5A742;object-fit:cover;background:#ffffff;"
                                            >
                                        @endif
                                    </td>
                                    <td style="vertical-align:middle;font-size:16px;line-height:1.7;color:#073B3A;">
                                        Best regards,<br>
                                        <strong>Luac Akook Yieu Youth Association (LAYYA)</strong><br>
                                        Info &amp; Communications Team<br>
                                        <a href="mailto:{{ $contactEmail }}" style="color:#073B3A;font-weight:600;text-decoration:none;">{{ $contactEmail }}</a><br>
                                        <a href="{{ $websiteUrl }}" style="color:#073B3A;font-weight:600;text-decoration:none;">{{ $websiteDisplay }}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:20px 28px 28px;">
                            <p style="margin:0;font-size:12px;line-height:1.6;color:#687976;">
                                This message was sent because you registered on the LAYYA youth census form.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
