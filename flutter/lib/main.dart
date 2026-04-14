import 'package:flutter/material.dart';
import 'package:fitpulse/theme/app_theme.dart';
import 'package:fitpulse/screens/landing_screen.dart';

void main() {
  runApp(const FitPulseApp());
}

class FitPulseApp extends StatelessWidget {
  const FitPulseApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FitPulse',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: const LandingScreen(),
    );
  }
}
