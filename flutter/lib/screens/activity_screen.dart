import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:fitpulse/theme/app_theme.dart';

class ActivityScreen extends StatefulWidget {
  const ActivityScreen({Key? key}) : super(key: key);

  @override
  State<ActivityScreen> createState() => _ActivityScreenState();
}

class _ActivityScreenState extends State<ActivityScreen> {
  String _activeFilter = 'all';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bgDeep,
      appBar: AppBar(
        backgroundColor: AppTheme.bgDeep.withOpacity(0.8),
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('ACTIVITY', style: TextStyle(fontSize: 10, color: AppTheme.textSecondary, letterSpacing: 1.5, fontWeight: FontWeight.bold)),
            const Text('Your History', style: TextStyle(fontSize: 20, color: AppTheme.textPrimary, fontWeight: FontWeight.bold)),
          ],
        ),
        actions: [
          IconButton(icon: const Icon(LucideIcons.plus, color: AppTheme.accent), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Stats Grid
            Row(
              children: [
                _buildStatCard('Total Sessions', '142', LucideIcons.dumbbell, AppTheme.violet),
                const SizedBox(width: 12),
                _buildStatCard('Calories Burned', '42,500', LucideIcons.flame, AppTheme.accentVariant),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                _buildStatCard('Active Time', '124h 30m', LucideIcons.timer, AppTheme.sky),
                const SizedBox(width: 12),
                _buildStatCard('Avg Session', '45m', LucideIcons.activity, AppTheme.emerald),
              ],
            ),
            const SizedBox(height: 24),

            // Activity Feed Header
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppTheme.bgCard,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: AppTheme.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Activity Feed', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                      TextButton.icon(
                        style: TextButton.styleFrom(
                          foregroundColor: AppTheme.accent,
                          backgroundColor: AppTheme.accent.withOpacity(0.1),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        ),
                        onPressed: () {},
                        icon: const Icon(LucideIcons.plus, size: 14),
                        label: const Text('Log', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  
                  // Filters
                  SizedBox(
                    height: 36,
                    child: ListView(
                      scrollDirection: Axis.horizontal,
                      children: [
                        _buildFilterPill('all', 'All', LucideIcons.filter, AppTheme.textSecondary),
                        _buildFilterPill('strength', 'Strength', LucideIcons.dumbbell, AppTheme.violet),
                        _buildFilterPill('cardio', 'Cardio', LucideIcons.heartPulse, AppTheme.accent),
                        _buildFilterPill('yoga', 'Yoga', LucideIcons.personStanding, AppTheme.emerald),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  
                  // Feed List
                  _buildActivityItem('Morning Run', 'Cardio', 'Today', '45m', '420 kcal', LucideIcons.heartPulse, AppTheme.accent),
                  _buildActivityItem('Upper Body Blast', 'Strength', 'Yesterday', '60m', '380 kcal', LucideIcons.dumbbell, AppTheme.violet),
                  _buildActivityItem('Vinyasa Flow', 'Yoga', '12 Apr', '30m', '150 kcal', LucideIcons.personStanding, AppTheme.emerald),
                  _buildActivityItem('HIIT Circuit', 'Cardio', '10 Apr', '25m', '310 kcal', LucideIcons.zap, AppTheme.accentVariant),
                  _buildActivityItem('Leg Day', 'Strength', '8 Apr', '50m', '400 kcal', LucideIcons.dumbbell, AppTheme.violet),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard(String label, String value, IconData icon, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppTheme.bgCard,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppTheme.border),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: color.withOpacity(0.15),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, size: 16, color: color),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(label, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textSecondary, letterSpacing: 1.1)),
                  const SizedBox(height: 4),
                  Text(value, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFilterPill(String id, String label, IconData icon, Color baseColor) {
    bool isActive = _activeFilter == id;
    Color color = isActive ? baseColor : AppTheme.textSecondary;
    return GestureDetector(
      onTap: () => setState(() => _activeFilter = id),
      child: Container(
        margin: const EdgeInsets.only(right: 8),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isActive ? color.withOpacity(0.15) : AppTheme.bgDeep,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: isActive ? color.withOpacity(0.3) : AppTheme.border),
        ),
        child: Row(
          children: [
            Icon(icon, size: 12, color: color),
            const SizedBox(width: 6),
            Text(label, style: TextStyle(
              color: color,
              fontWeight: FontWeight.bold,
              fontSize: 11,
            )),
          ],
        ),
      ),
    );
  }

  Widget _buildActivityItem(String title, String type, String date, String duration, String calories, IconData icon, Color color) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.bgDeep,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.border),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [color, color.withOpacity(0.7)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(12),
              boxShadow: [
                BoxShadow(color: color.withOpacity(0.2), blurRadius: 8, offset: const Offset(0, 4)),
              ],
            ),
            child: Icon(icon, size: 16, color: Colors.white),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Text(date, style: const TextStyle(fontSize: 11, color: AppTheme.textSecondary, fontWeight: FontWeight.bold)),
                    const Text(' • ', style: TextStyle(fontSize: 11, color: AppTheme.textSecondary)),
                    Text(type, style: TextStyle(fontSize: 11, color: color, fontWeight: FontWeight.bold)),
                  ],
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(duration, style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: color)),
              const SizedBox(height: 2),
              Text(calories, style: const TextStyle(fontSize: 10, color: AppTheme.textSecondary, fontWeight: FontWeight.bold)),
            ],
          ),
        ],
      ),
    );
  }
}
