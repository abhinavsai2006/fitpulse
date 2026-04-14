import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:fitpulse/theme/app_theme.dart';

class NutritionScreen extends StatefulWidget {
  const NutritionScreen({Key? key}) : super(key: key);

  @override
  State<NutritionScreen> createState() => _NutritionScreenState();
}

class _NutritionScreenState extends State<NutritionScreen> {
  int _waterGlasses = 6;
  final int _budget = 2500;
  final int _consumed = 1680;
  
  @override
  Widget build(BuildContext context) {
    int remaining = _budget - _consumed;
    double pct = _consumed / _budget;

    return Scaffold(
      backgroundColor: AppTheme.bgDeep,
      appBar: AppBar(
        backgroundColor: AppTheme.bgDeep.withOpacity(0.8),
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('NUTRITION', style: TextStyle(fontSize: 10, color: AppTheme.textSecondary, letterSpacing: 1.5, fontWeight: FontWeight.bold)),
            const Text('Fuel Board', style: TextStyle(fontSize: 20, color: AppTheme.textPrimary, fontWeight: FontWeight.bold)),
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
            // Calorie Budget
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
                      const Text('CALORIE BUDGET', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textSecondary, letterSpacing: 1.1)),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppTheme.emerald.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text('${(pct * 100).toInt()}%', style: const TextStyle(color: AppTheme.emerald, fontSize: 10, fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(_consumed.toString(), style: const TextStyle(fontSize: 36, fontWeight: FontWeight.bold, color: Colors.white)),
                  Text('of $_budget kcal goal', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
                  const SizedBox(height: 16),
                  LinearProgressIndicator(
                    value: pct,
                    backgroundColor: Colors.white.withOpacity(0.05),
                    valueColor: const AlwaysStoppedAnimation(AppTheme.emerald),
                    minHeight: 8,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _buildMacroSummary('120g', 'protein', LucideIcons.scale, AppTheme.violet),
                      _buildMacroSummary('180g', 'carbs', LucideIcons.flame, AppTheme.sky),
                      _buildMacroSummary('55g', 'fat', LucideIcons.droplets, AppTheme.emerald),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.02),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('REMAINING BUDGET', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
                            Text('$remaining kcal left', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Macros Card
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
                  const Text('Macro Tracking', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 16),
                  _buildMacroBar('Protein', 120, 150, AppTheme.violet),
                  _buildMacroBar('Carbs', 180, 250, AppTheme.sky),
                  _buildMacroBar('Fat', 55, 70, AppTheme.emerald),
                  const SizedBox(height: 20),
                  // Hydration
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.02),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('HYDRATION', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
                            Text('$_waterGlasses / 10 glasses', style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.sky)),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: List.generate(10, (index) {
                            return GestureDetector(
                              onTap: () => setState(() => _waterGlasses = index + 1),
                              child: Container(
                                width: 24,
                                height: 32,
                                decoration: BoxDecoration(
                                  gradient: index < _waterGlasses 
                                    ? const LinearGradient(colors: [Color(0xFF7DD3FC), AppTheme.sky], begin: Alignment.topCenter, end: Alignment.bottomCenter)
                                    : null,
                                  color: index < _waterGlasses ? null : Colors.white.withOpacity(0.06),
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(color: index < _waterGlasses ? AppTheme.sky.withOpacity(0.3) : AppTheme.border),
                                ),
                              ),
                            );
                          }),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Meals
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
                  const Text('Meals', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 16),
                  _buildMeal('Breakfast', '8:00 AM', '450 kcal', LucideIcons.sunrise, AppTheme.amber),
                  _buildMeal('Lunch', '1:00 PM', '650 kcal', LucideIcons.salad, AppTheme.emerald),
                  _buildMeal('Dinner', '7:30 PM', '580 kcal', LucideIcons.utensils, AppTheme.violet),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMacroSummary(String val, String label, IconData icon, Color color) {
    return Column(
      children: [
        Icon(icon, size: 16, color: color),
        const SizedBox(height: 4),
        Text(val, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
        Text(label, style: const TextStyle(fontSize: 10, color: AppTheme.textSecondary)),
      ],
    );
  }

  Widget _buildMacroBar(String label, int val, int target, Color color) {
    double pct = val / target;
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
              Row(
                children: [
                  Text('${val}g', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: color)),
                  Text(' / ${target}g', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
                ],
              ),
            ],
          ),
          const SizedBox(height: 6),
          LinearProgressIndicator(
            value: pct,
            backgroundColor: Colors.white.withOpacity(0.05),
            valueColor: AlwaysStoppedAnimation(color),
            minHeight: 6,
            borderRadius: BorderRadius.circular(3),
          ),
        ],
      ),
    );
  }

  Widget _buildMeal(String title, String time, String kcal, IconData icon, Color color) {
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
                Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
                Text(time, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
              ],
            ),
          ),
          Text(kcal, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(width: 8),
          const Icon(LucideIcons.chevronDown, size: 16, color: AppTheme.textSecondary),
        ],
      ),
    );
  }
}
