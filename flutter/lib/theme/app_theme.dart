import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Core palette
  static const Color bgDeep = Color(0xFF08080D);
  static const Color bgBase = Color(0xFF0C0C14);
  static const Color bgRaised = Color(0xFF12121E);
  static const Color bgCard = Color(0xFF16162A);
  
  static const Color border = Color(0x10FFFFFF); // 0.06 opacity
  static const Color accent = Color(0xFFFF6B47);
  static const Color accentVariant = Color(0xFFFF8A5C);

  static const Color textPrimary = Color(0xFFF0F0F5);
  static const Color textSecondary = Color(0xFF888EA0);
  static const Color textTertiary = Color(0xFF555B6E);

  static const Color violet = Color(0xFF8B5CF6);
  static const Color emerald = Color(0xFF34D399);
  static const Color sky = Color(0xFF38BDF8);
  static const Color amber = Color(0xFFFBBF24);
  static const Color rose = Color(0xFFFB7185);

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: bgDeep,
      primaryColor: accent,
      colorScheme: const ColorScheme.dark(
        primary: accent,
        secondary: accentVariant,
        surface: bgRaised,
        background: bgDeep,
      ),
      textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme).copyWith(
        displayLarge: GoogleFonts.spaceGrotesk(color: textPrimary, fontWeight: FontWeight.bold),
        displayMedium: GoogleFonts.spaceGrotesk(color: textPrimary, fontWeight: FontWeight.bold),
        displaySmall: GoogleFonts.spaceGrotesk(color: textPrimary, fontWeight: FontWeight.bold),
        headlineLarge: GoogleFonts.spaceGrotesk(color: textPrimary, fontWeight: FontWeight.bold),
        headlineMedium: GoogleFonts.spaceGrotesk(color: textPrimary, fontWeight: FontWeight.bold),
        headlineSmall: GoogleFonts.spaceGrotesk(color: textPrimary, fontWeight: FontWeight.bold),
        titleLarge: GoogleFonts.spaceGrotesk(color: textPrimary, fontWeight: FontWeight.bold),
        bodyLarge: GoogleFonts.inter(color: textPrimary),
        bodyMedium: GoogleFonts.inter(color: textSecondary),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: accent,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          elevation: 8,
          shadowColor: accent.withOpacity(0.5),
          textStyle: GoogleFonts.inter(fontWeight: FontWeight.bold, fontSize: 16),
        ),
      ),
      cardTheme: CardThemeData(
        color: bgCard,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: border, width: 1),
        ),
      ),
    );
  }
}
