import { ImageResponse } from 'next/og'
 
// Resim ayarları
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Favicon Oluşturucu
export default function Icon() {
  return new ImageResponse(
    (
      // Siyah Zemin
      <div
        style={{
          fontSize: 20,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#3B82F6', // Kognitect Mavisi
          borderRadius: '20%', // Hafif yuvarlatılmış köşeler (App ikonu gibi)
          fontWeight: 900,
        }}
      >
        {/* Markanın Baş Harfi */}
        K
      </div>
    ),
    {
      ...size,
    }
  )
}