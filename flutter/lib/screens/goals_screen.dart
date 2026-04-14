import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:fitpulse/theme/app_theme.dart';

class GoalsScreen extends StatefulWidget {
  const GoalsScreen({Key? key}) : super(key: key);

  @override
  State<GoalsScreen> createState() => _GoalsScreenState();
}

class _GoalsScreenState extends State<GoalsScreen> {
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
            const Text('GOALS', style: TextStyle(fontSize: 10, color: AppTheme.textSecondary, letterSpacing: 1.5, fontWeight: FontWeight.bold)),
            const Text('Goal Roadmap', style: TextStyle(fontSize: 20, color: AppTheme.textPrimary, fontWeight: FontWeight.bold)),
          ],
        ),
        actions: [
          IconButton(icon: const Icon(LucideIcons.plus, color: AppTheme.accent), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Stats
            Row(
              children: [
                _buildStatCard('Active', '8', AppTheme.accent),
                const SizedBox(width: 12),
                _buildStatCard('Done', '4', AppTheme.emerald),
                const SizedBox(width: 12),
                _buildStatCard('Avg', '65%', AppTheme.amber),
              ],
            ),
            const SizedBox(height: 16),
            
            // Overall Progress
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: AppTheme.bgCard,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: AppTheme.border),
              ),
              child: Row(
                children: [
                  Stack(
                    alignment: Alignment.center,
                    children: [
                      SizedBox(
                        width: 72,
                        height: 72,
                        child: CircularProgressIndicator(
                          value: 0.65,
                          strokeWidth: 8,
                          backgroundColor: Colors.white.withOpacity(0.06),
                          color: AppTheme.accent,
                        ),
                      ),
                      const Text('65%', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
                    ],
                  ),
                  const SizedBox(width: 24),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Overall Progress', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                        const SizedBox(height: 4),
                        const Text('4 of 12 goals completed. Great work!', style: TextStyle(fontSize: 12, color: AppTheme.textSecondary)),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            _buildPill('Strength: 3', AppTheme.violet),
                            const SizedBox(width: 4),
                            _buildPill('Cardio: 2', AppTheme.accent),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Goals Feed
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppTheme.bgCard,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: AppTheme.border),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      SizedBox(
                        height: 32,
                        width: 200,
                        child: ListView(
                          scrollDirection: Axis.horizontal,
                          children: [
                            _buildFilter('all', 'All (8)'),
                            _buildFilter('strength', 'Strength'),
                            _buildFilter('cardio', 'Cardio'),
                          ],
                        ),
                      ),
                      TextButton.icon(
                        style: TextButton.styleFrom(
                          foregroundColor: Colors.white,
                          backgroundColor: AppTheme.accent,
                          minimumSize: const Size(0, 32),
                          padding: const EdgeInsets.symmetric(horizontal: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                        onPressed: () {},
                        icon: const Icon(LucideIcons.plus, size: 14),
                        label: const Text('New', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  
                  _buildGoalCard('Deadlift 350 lbs', 'Strength', 0.8, '280 / 350 lbs', AppTheme.violet, LucideIcons.dumbbell),
                  _buildGoalCard('Sub-20 5K', 'Cardio', 0.9, '21:30 / 19:59', AppTheme.accent, LucideIcons.heartPulse),
                  _buildGoalCard('Workout 4x/week', 'Consistency', 1.0, '4 / 4 sessions', AppTheme.amber, LucideIcons.trophy),
                  _buildGoalCard('12% Body Fat', 'Body', 0.5, '15% / 12%', AppTheme.emerald, LucideIcons.flame),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard(String label, String value, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppTheme.bgCard,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppTheme.border),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
            const SizedBox(height: 4),
            Text(value, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: color)),
          ],
        ),
      ),
    );
  }

  Widget _buildPill(String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.15),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Text(text, style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: color)),
    );
  }

  Widget _buildFilter(String id, String label) {
    bool isActive = _activeFilter == id;
    return GestureDetector(
      onTap: () => setState(() => _activeFilter = id),
      child: Container(
        margin: const EdgeInsets.only(right: 8),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isActive ? AppTheme.accent.withOpacity(0.15) : AppTheme.bgDeep,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: isActive ? AppTheme.accent.withOpacity(0.3) : AppTheme.border),
        ),
        child: Center(
          child: Text(label, style: TextStyle(
            color: isActive ? AppTheme.accent : AppTheme.textSecondary,
            fontWeight: FontWeight.bold,
            fontSize: 10,
          )),
        ),
      ),
    );
  }

  Widget _buildGoalCard(String title, String cat, double pct, String meta, Color color, IconData icon) {
    bool done = pct >= 1.0;
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      clipBehavior: Clip.hardEdge,
      decoration: BoxDecoration(
        color: done ? color.withOpacity(0.1) : AppTheme.bgDeep,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: done ? color.withOpacity(0.3) : AppTheme.border),
      ),
      child: Column(
        children: [
          Container(height: 4, color: color),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: color.withOpacity(0.15),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Icon(icon, size: 14, color: color),
                        ),
                        const SizedBox(width: 12),
                        Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
                      ],
                    ),
                    if (done) 
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(color: AppTheme.emerald.withOpacity(0.2), borderRadius: BorderRadius.circular(12)),
                        child: const Text('Done!', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.emerald)),
                      )
                    else 
                      Text('${(pct * 100).toInt()}%', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: color)),
                  ],
                ),
                const SizedBox(height: 12),
                LinearProgressIndicator(
                  value: pct,
                  backgroundColor: Colors.white.withOpacity(0.05),
                  valueColor: AlwaysStoppedAnimation(color),
                  minHeight: 6,
                  borderRadius: BorderRadius.circular(3),
                ),
                const SizedBox(height: 12),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(meta, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
                    const Icon(LucideIcons.trendingUp, size: 12, color: AppTheme.textSecondary),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
