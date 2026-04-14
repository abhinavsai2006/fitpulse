import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:fitpulse/theme/app_theme.dart';

class QuickWorkoutCard extends StatelessWidget {
  final String title;
  final String category;
  final String duration;
  final Color color;

  const QuickWorkoutCard({
    Key? key,
    required this.title,
    required this.category,
    required this.duration,
    required this.color,
  }) : super(key: key);

  IconData _getIcon() {
    switch (category.toLowerCase()) {
      case 'strength': return LucideIcons.dumbbell;
      case 'cardio': return LucideIcons.activity;
      case 'yoga': return LucideIcons.heart;
      default: return LucideIcons.flame;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 160,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.bgCard,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppTheme.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: color.withOpacity(0.15),
              borderRadius: BorderRadius.circular(14),
            ),
            child: Icon(_getIcon(), color: color, size: 20),
          ),
          const Spacer(),
          Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
          const SizedBox(height: 4),
          Text('$duration min • $category', style: const TextStyle(color: AppTheme.textSecondary, fontSize: 11)),
        ],
      ),
    );
  }
}
