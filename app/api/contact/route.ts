import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const {
      isim,
      email,
      sirket,
      web_sitesi,
      proje_dosyasi,
      kategori,
      kpi
    } = body;

    const { data, error } = await resend.emails.send({
      from: 'Kognitect Analiz <analiz@kognitect.com>',
      to: ['info@kognitect.com', 'bektas.sari@gmail.com'],
      subject: `KOGNITECT: Yeni Analiz Talebi - ${sirket || 'Belirtilmedi'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; rounded: 8px;">
          <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">Yeni Analiz Talebi</h2>
          
          <div style="margin-top: 20px;">
            <p><strong>İsim Soyisim:</strong> ${isim || 'N/A'}</p>
            <p><strong>E-posta:</strong> ${email || 'N/A'}</p>
            <p><strong>Şirket / Kurum:</strong> ${sirket || 'N/A'}</p>
            <p><strong>Web Sitesi:</strong> ${web_sitesi || 'N/A'}</p>
            <p><strong>Proje Dosyası:</strong> ${proje_dosyasi || 'N/A'}</p>
          </div>

          <div style="margin-top: 30px; background-color: #f9fafb; padding: 15px; border-radius: 6px;">
            <h3 style="margin-top: 0; color: #374151;">Uzmanlık Alanları:</h3>
            <p style="color: #4b5563;">${kategori || 'N/A'}</p>
          </div>

          <div style="margin-top: 20px; background-color: #f9fafb; padding: 15px; border-radius: 6px;">
            <h3 style="margin-top: 0; color: #374151;">Ana Darboğaz / KPI:</h3>
            <p style="white-space: pre-wrap; color: #4b5563;">${kpi || 'N/A'}</p>
          </div>

          <footer style="margin-top: 30px; font-size: 12px; color: #9ca3af; text-align: center;">
            Kognitect Bilişsel Mimari Sistemleri - Otomatik Bildirim
          </footer>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
