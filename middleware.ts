import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 1. Ambil kode negara dari Vercel
  const country = req.geo?.country || 'US'; 
  
  // 2. Ambil parameter dari link (indo dan luar)
  const urlParams = req.nextUrl.searchParams;
  const linkIndo = urlParams.get('indo');
  const linkLuar = urlParams.get('luar');

  // Jika asal Indonesia dan ada link Indo → langsung redirect (server-side)
  if (country === 'ID' && linkIndo) {
    return NextResponse.redirect(linkIndo);
  } 

  // Jika dari Luar Negeri dan ada link Luar → tampilkan landing page (bukan redirect)
  // Ini supaya Pinterest crawler lihat halaman HTML biasa, bukan 301/302 redirect
  if (linkLuar) {
    const landingUrl = req.nextUrl.clone();
    landingUrl.pathname = '/go/landing';
    // Teruskan parameter luar ke landing page
    landingUrl.searchParams.set('url', linkLuar);
    return NextResponse.rewrite(landingUrl);
  }

  // Jika diklik tapi tidak ada parameter (misal test), biarkan lanjut ke halaman utama
  return NextResponse.next();
}

// Tentukan route mana saja yang pakai middleware ini
export const config = {
  matcher: '/go', 
};
