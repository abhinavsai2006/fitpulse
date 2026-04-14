import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:fitpulse/theme/app_theme.dart';
import 'package:fl_chart/fl_chart.dart';

class AnalyticsScreen extends StatelessWidget {
  const AnalyticsScreen({Key? key}) : super(key: key);

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
            const Text('ANALYTICS', style: TextStyle(fontSize: 10, color: AppTheme.textSecondary, letterSpacing: 1.5, fontWeight: FontWeight.bold)),
            const Text('Performance Stats', style: TextStyle(fontSize: 20, color: AppTheme.textPrimary, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Score Grid
            Row(
              children: [
                _buildScoreCard('Strength Score', '82', '+6', AppTheme.violet),
                const SizedBox(width: 12),
                _buildScoreCard('Cardio Score', '75', '+4', AppTheme.accent),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                _buildScoreCard('Recovery', '70', '=', AppTheme.emerald),
                const SizedBox(width: 12),
                _buildScoreCard('VO2 Max', '56 ml', '+2', AppTheme.amber),
              ],
            ),
            const SizedBox(height: 24),

            // Progress Trend Chart
            Container(
              height: 280,
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
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('6 WEEKS', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
                          const Text('Progress Trend', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: AppTheme.violet.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: AppTheme.violet.withOpacity(0.3)),
                        ),
                        child: const Text('Strength', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.violet)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  Expanded(
                    child: LineChart(
                      LineChartData(
                        gridData: const FlGridData(show: false),
                        titlesData: FlTitlesData(
                          rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
                          topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
                          leftTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
                          bottomTitles: AxisTitles(
                            sideTitles: SideTitles(
                              showTitles: true,
                              reservedSize: 22,
                              getTitlesWidget: (value, meta) {
                                const style = TextStyle(color: AppTheme.textSecondary, fontSize: 10, fontWeight: FontWeight.bold);
                                Widget text;
                                switch (value.toInt()) {
                                  case 1: text = const Text('W1', style: style); break;
                                  case 3: text = const Text('W3', style: style); break;
                                  case 5: text = const Text('W5', style: style); break;
                                  default: text = const Text('', style: style); break;
                                }
                                return SideTitleWidget(axisSide: meta.axisSide, child: text);
                              },
                            ),
                          ),
                        ),
                        borderData: FlBorderData(show: false),
                        lineBarsData: [
                          LineChartBarData(
                            spots: const [
                              FlSpot(0, 60),
                              FlSpot(1, 65),
                              FlSpot(2, 62),
                              FlSpot(3, 72),
                              FlSpot(4, 75),
                              FlSpot(5, 82),
                            ],
                            isCurved: true,
                            color: AppTheme.violet,
                            barWidth: 3,
                            isStrokeCapRound: true,
                            dotData: const FlDotData(show: false),
                            belowBarData: BarAreaData(
                              show: true,
                              color: AppTheme.violet.withOpacity(0.1),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Daily Volume Chart
            Container(
              height: 280,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppTheme.bgCard,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: AppTheme.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('THIS WEEK', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
                  const Text('Daily Volume', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 24),
                  Expanded(
                    child: BarChart(
                      BarChartData(
                        alignment: BarChartAlignment.spaceAround,
                        maxY: 1200,
                        barTouchData: BarTouchData(enabled: false),
                        titlesData: FlTitlesData(
                          show: true,
                          bottomTitles: AxisTitles(
                            sideTitles: SideTitles(
                              showTitles: true,
                              getTitlesWidget: (val, meta) {
                                const style = TextStyle(color: AppTheme.textSecondary, fontSize: 10, fontWeight: FontWeight.bold);
                                const texts = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
                                return SideTitleWidget(axisSide: meta.axisSide, child: Text(texts[val.toInt()], style: style));
                              },
                              reservedSize: 22,
                            ),
                          ),
                          leftTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
                          topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
                          rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
                        ),
                        gridData: const FlGridData(show: false),
                        borderData: FlBorderData(show: false),
                        barGroups: [
                          _buildBarGroup(0, 450, Colors.white.withOpacity(0.06)),
                          _buildBarGroup(1, 620, Colors.white.withOpacity(0.06)),
                          _buildBarGroup(2, 500, Colors.white.withOpacity(0.06)),
                          _buildBarGroup(3, 1050, AppTheme.accent), // Peak day
                          _buildBarGroup(4, 700, Colors.white.withOpacity(0.06)),
                          _buildBarGroup(5, 300, Colors.white.withOpacity(0.06)),
                          _buildBarGroup(6, 800, Colors.white.withOpacity(0.06)),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            
            // PB
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
                  const Text('ALL TIME', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
                  const Text('Personal Records', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 16),
                  _buildRecordRow('Bench Press', '205 lbs', '+10 lbs', true),
                  _buildRecordRow('Back Squat', '285 lbs', '+15 lbs', true),
                  _buildRecordRow('5K Pace', '24:30', '-45s', true),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  BarChartGroupData _buildBarGroup(int x, double y, Color color) {
    return BarChartGroupData(
      x: x,
      barRods: [
        BarChartRodData(
          toY: y,
          color: color,
          width: 24,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(6)),
        ),
      ],
    );
  }

  Widget _buildScoreCard(String title, String val, String change, Color color) {
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
            Text(title, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
            const SizedBox(height: 8),
            Text(val, style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: color)),
            const SizedBox(height: 4),
             Text(change == '=' ? 'Stable' : '$change this month', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: change == '=' ? AppTheme.textSecondary : AppTheme.emerald)),
            const SizedBox(height: 8),
            LinearProgressIndicator(
              value: 0.7,
              backgroundColor: Colors.white.withOpacity(0.05),
              valueColor: AlwaysStoppedAnimation(color),
              minHeight: 4,
              borderRadius: BorderRadius.circular(2),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRecordRow(String name, String val, String change, bool up) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
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
              Text(name, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
              const Text('best set', style: TextStyle(fontSize: 10, color: AppTheme.textSecondary)),
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(val, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
              Text(change, style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: up ? AppTheme.emerald : AppTheme.amber)),
            ],
          ),
        ],
      ),
    );
  }
}
