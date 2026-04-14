import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:fitpulse/theme/app_theme.dart';
import 'package:fitpulse/screens/dashboard_screen.dart';

class LandingScreen extends StatelessWidget {
  const LandingScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0C0C14), // AppTheme.bgDeep
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Hero Section
            SizedBox(
              height: MediaQuery.of(context).size.height,
              child: Stack(
                children: [
                  // Glows
                  Positioned(
                    top: -100,
                    left: -100,
                    child: Container(
                      width: 300,
                      height: 300,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: AppTheme.accent.withOpacity(0.15),
                        boxShadow: [BoxShadow(color: AppTheme.accent.withOpacity(0.1), blurRadius: 100, spreadRadius: 50)],
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 100,
                    right: -50,
                    child: Container(
                      width: 250,
                      height: 250,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: AppTheme.violet.withOpacity(0.15),
                        boxShadow: [BoxShadow(color: AppTheme.violet.withOpacity(0.1), blurRadius: 100, spreadRadius: 50)],
                      ),
                    ),
                  ),
                  
                  SafeArea(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 24.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.04),
                              borderRadius: BorderRadius.circular(24),
                              border: Border.all(color: Colors.white.withOpacity(0.08)),
                            ),
                            child: const Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(LucideIcons.sparkles, color: AppTheme.accent, size: 14),
                                SizedBox(width: 8),
                                Text('AI-Powered Fitness', style: TextStyle(color: AppTheme.accent, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
                              ],
                            ),
                          ),
                          const SizedBox(height: 32),
                          RichText(
                            textAlign: TextAlign.center,
                            text: TextSpan(
                              style: GoogleFonts.spaceGrotesk(
                                color: Colors.white,
                                fontSize: 48,
                                fontWeight: FontWeight.bold,
                                height: 1.1,
                                letterSpacing: -1,
                              ),
                              children: const [
                                TextSpan(text: 'Train '),
                                TextSpan(text: 'Smarter.\n', style: TextStyle(color: AppTheme.accent)),
                                TextSpan(text: 'Track '),
                                TextSpan(text: 'Clearer.\n', style: TextStyle(color: AppTheme.emerald)),
                                TextSpan(text: 'Recover '),
                                TextSpan(text: 'Faster.', style: TextStyle(color: AppTheme.violet)),
                              ],
                            ),
                          ),
                          const SizedBox(height: 24),
                          Text(
                            'FitPulse unifies workouts, nutrition, analytics, and social accountability — built for athletes who mean it.',
                            textAlign: TextAlign.center,
                            style: GoogleFonts.inter(
                              color: AppTheme.textSecondary,
                              fontSize: 16,
                              height: 1.5,
                            ),
                          ),
                          const SizedBox(height: 48),
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton.icon(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: AppTheme.accent,
                                foregroundColor: Colors.white,
                                padding: const EdgeInsets.symmetric(vertical: 20),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                                textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                              ),
                              onPressed: () {
                                Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const DashboardScreen()));
                              },
                              icon: const Icon(LucideIcons.play, size: 20),
                              label: const Text('Get Started Free'),
                            ),
                          ),
                          const SizedBox(height: 16),
                          SizedBox(
                            width: double.infinity,
                            child: OutlinedButton(
                              style: OutlinedButton.styleFrom(
                                padding: const EdgeInsets.symmetric(vertical: 20),
                                side: const BorderSide(color: AppTheme.border),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                              ),
                              onPressed: () {
                                Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const DashboardScreen()));
                              },
                              child: const Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text('See Dashboard', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                                  SizedBox(width: 8),
                                  Icon(LucideIcons.arrowRight, size: 16, color: Colors.white),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Features Grid
            Container(
              color: Colors.white.withOpacity(0.02),
              padding: const EdgeInsets.symmetric(vertical: 64, horizontal: 24),
              child: Column(
                children: [
                  const Text('Built for athletes who mean it', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Colors.white), textAlign: TextAlign.center),
                  const SizedBox(height: 48),
                  _buildFeatureCard(LucideIcons.barChart3, AppTheme.accent, 'Performance Analytics', 'Strength scores, cardio zones, VO₂ max trends.'),
                  _buildFeatureCard(LucideIcons.goal, AppTheme.amber, 'Goal Roadmap', 'Set milestones and receive AI-suggested adjustments.'),
                  _buildFeatureCard(LucideIcons.dumbbell, AppTheme.violet, 'Workout Library', '200+ expert-designed programs across all categories.'),
                  _buildFeatureCard(LucideIcons.heartPulse, AppTheme.rose, 'Live Heart Rate', 'Real-time HR monitoring with zone-based training.'),
                ],
              ),
            ),
            
            // Footer Action
            Container(
              padding: const EdgeInsets.all(40),
              margin: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [AppTheme.accent.withOpacity(0.12), AppTheme.violet.withOpacity(0.08)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(32),
                border: Border.all(color: AppTheme.accent.withOpacity(0.15)),
              ),
              child: Column(
                children: [
                  const Text('Your best performance starts now', textAlign: TextAlign.center, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 16),
                  const Text('Join thousands of athletes. No credit card required.', textAlign: TextAlign.center, style: TextStyle(fontSize: 14, color: AppTheme.textSecondary)),
                  const SizedBox(height: 32),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.accent,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      ),
                      onPressed: () => Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const DashboardScreen())),
                      child: const Text('Start Free Journey', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                    ),
                  )
                ],
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildFeatureCard(IconData icon, Color color, String title, String desc) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: AppTheme.bgCard,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppTheme.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: color.withOpacity(0.15),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: color.withOpacity(0.25)),
            ),
            child: Icon(icon, color: color, size: 24),
          ),
          const SizedBox(height: 16),
          Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 8),
          Text(desc, style: const TextStyle(fontSize: 14, color: AppTheme.textSecondary, height: 1.5)),
        ],
      ),
    );
  }
}
