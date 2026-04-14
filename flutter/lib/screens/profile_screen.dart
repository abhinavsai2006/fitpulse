import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:fitpulse/theme/app_theme.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  int _activeTabIndex = 0;

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
            const Text('PROFILE', style: TextStyle(fontSize: 10, color: AppTheme.textSecondary, letterSpacing: 1.5, fontWeight: FontWeight.bold)),
            const Text('Your Account', style: TextStyle(fontSize: 20, color: AppTheme.textPrimary, fontWeight: FontWeight.bold)),
          ],
        ),
        actions: [
          IconButton(icon: const Icon(LucideIcons.settings, color: AppTheme.textSecondary), onPressed: () {}),
          const SizedBox(width: 8),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // User Card
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
                      children: [
                        Container(
                          width: 80,
                          height: 80,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(20),
                            gradient: const LinearGradient(
                              colors: [AppTheme.accent, AppTheme.accentVariant],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                            boxShadow: [
                              BoxShadow(color: AppTheme.accent.withOpacity(0.3), blurRadius: 20, offset: const Offset(0, 8)),
                            ],
                          ),
                          child: const Center(child: Text('AS', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Colors.white))),
                        ),
                        const SizedBox(width: 20),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text('Abhinav Sai', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
                              const SizedBox(height: 4),
                              const Text('@abhinav · user@example.com', style: TextStyle(fontSize: 12, color: AppTheme.textSecondary)),
                              const SizedBox(height: 12),
                              Row(
                                children: [
                                  _buildBadge(LucideIcons.star, 'Level 12', AppTheme.accent),
                                  const SizedBox(width: 8),
                                  _buildBadge(LucideIcons.flame, '12-day streak', AppTheme.accentVariant),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _buildStat('42', 'Sessions'),
                        _buildStat('12,450', 'Kcal Tracked'),
                        _buildStat('36h', 'Active Hours'),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Tabs
              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.02),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppTheme.border),
                ),
                child: Row(
                  children: [
                    _buildTab(0, 'Overview', LucideIcons.user),
                    _buildTab(1, 'Achievements', LucideIcons.trophy),
                    _buildTab(2, 'Settings', LucideIcons.settings),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Tab Content
              if (_activeTabIndex == 0) _buildOverviewTab(),
              if (_activeTabIndex == 1) _buildAchievementsTab(),
              if (_activeTabIndex == 2) _buildSettingsTab(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildBadge(IconData icon, String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.15),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.2)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 10, color: color),
          const SizedBox(width: 4),
          Text(text, style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: color)),
        ],
      ),
    );
  }

  Widget _buildStat(String value, String label) {
    return Column(
      children: [
        Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
      ],
    );
  }

  Widget _buildTab(int index, String label, IconData icon) {
    final isActive = _activeTabIndex == index;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _activeTabIndex = index),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: isActive ? AppTheme.accent : Colors.transparent,
            borderRadius: BorderRadius.circular(12),
            boxShadow: isActive ? [BoxShadow(color: AppTheme.accent.withOpacity(0.3), blurRadius: 12, offset: const Offset(0, 4))] : null,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 14, color: isActive ? Colors.white : AppTheme.textSecondary),
              const SizedBox(width: 6),
              Text(label, style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.2,
                color: isActive ? Colors.white : AppTheme.textSecondary,
              )),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildOverviewTab() {
    return Column(
      children: [
        _buildSectionCard(LucideIcons.shield, 'Body Stats', const Color(0xFF8B5CF6), [
          _buildRow('Weight', '155 lbs'),
          _buildRow('Height', '5\'10"'),
          _buildRow('Body Fat', '14%'),
        ]),
        const SizedBox(height: 16),
        _buildSectionCard(LucideIcons.star, 'Daily Goals', const Color(0xFF34D399), [
          _buildRow('Daily Calories', '2,500 kcal'),
          _buildRow('Daily Steps', '10,000 steps'),
          _buildRow('Weekly Workouts', '4 sessions'),
        ]),
      ],
    );
  }

  Widget _buildAchievementsTab() {
    return Column(
      children: [
        _buildSectionCard(LucideIcons.trophy, 'Badge Shelf', AppTheme.amber, [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text('4 of 12 unlocked', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
            ],
          ),
          const SizedBox(height: 12),
          LinearProgressIndicator(
            value: 4/12,
            backgroundColor: Colors.white.withOpacity(0.05),
            valueColor: const AlwaysStoppedAnimation(AppTheme.amber),
            minHeight: 6,
            borderRadius: BorderRadius.circular(4),
          ),
          const SizedBox(height: 24),
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: 0.85,
            children: [
              _buildBadgeCard('🔥', '7-Day Streak', 'Workout for 7 days', true, 'Rare', AppTheme.sky),
              _buildBadgeCard('🏋️', 'Heavy Lifter', 'Bench press 200lbs', true, 'Epic', AppTheme.violet),
              _buildBadgeCard('🏃', 'Marathoner', 'Run 26.2 miles', false, 'Legendary', AppTheme.amber),
              _buildBadgeCard('🥗', 'Clean Eater', 'Log perfect macros', true, 'Common', AppTheme.textSecondary),
            ],
          ),
        ]),
      ],
    );
  }

  Widget _buildBadgeCard(String emoji, String title, String desc, bool earned, String rarity, Color rarityColor) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: earned ? rarityColor.withOpacity(0.1) : Colors.white.withOpacity(0.02),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: earned ? rarityColor.withOpacity(0.3) : AppTheme.border),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(emoji, style: TextStyle(fontSize: 32, color: earned ? Colors.white : Colors.white.withOpacity(0.3))),
          const SizedBox(height: 12),
          Text(title, style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: earned ? Colors.white : AppTheme.textSecondary)),
          const SizedBox(height: 4),
          Text(desc, textAlign: TextAlign.center, style: const TextStyle(fontSize: 9, color: AppTheme.textSecondary)),
          const Spacer(),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: rarityColor.withOpacity(0.2),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(rarity.toUpperCase(), style: TextStyle(fontSize: 8, fontWeight: FontWeight.bold, color: rarityColor)),
          ),
        ],
      ),
    );
  }

  Widget _buildSettingsTab() {
    return Column(
      children: [
        _buildSectionCard(LucideIcons.settings, 'Preferences', AppTheme.accent, [
           _buildDropdownRow('Units', 'Imperial', ['Imperial', 'Metric']),
           _buildDropdownRow('Language', 'English', ['English', 'Spanish', 'French']),
           _buildDropdownRow('Theme', 'Dark', ['Dark', 'Light', 'System']),
        ]),
        const SizedBox(height: 16),
        _buildSectionCard(LucideIcons.bell, 'Notifications', AppTheme.accentVariant, [
           _buildToggleRow('Workout reminders', true),
           _buildToggleRow('Achievement alerts', true),
           _buildToggleRow('Weekly summary', true),
           _buildToggleRow('Nutrition reminders', false),
        ]),
        const SizedBox(height: 16),
        _buildSectionCard(LucideIcons.user, 'Account', AppTheme.sky, [
           _buildActionRow('Privacy Settings', LucideIcons.chevronRight),
           _buildActionRow('Export My Data', LucideIcons.chevronRight),
           const SizedBox(height: 8),
           Container(
             width: double.infinity,
             padding: const EdgeInsets.symmetric(vertical: 12),
             decoration: BoxDecoration(
               color: AppTheme.rose.withOpacity(0.15),
               borderRadius: BorderRadius.circular(12),
               border: Border.all(color: AppTheme.rose.withOpacity(0.3)),
             ),
             child: const Row(
               mainAxisAlignment: MainAxisAlignment.center,
               children: [
                 Icon(LucideIcons.logOut, size: 16, color: AppTheme.rose),
                 SizedBox(width: 8),
                 Text('Sign Out', style: TextStyle(color: AppTheme.rose, fontWeight: FontWeight.bold)),
               ],
             ),
           )
        ]),
      ],
    );
  }

  Widget _buildSectionCard(IconData icon, String title, Color color, List<Widget> children) {
    return Container(
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
            children: [
              Icon(icon, size: 18, color: color),
              const SizedBox(width: 8),
              Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
            ],
          ),
          const SizedBox(height: 16),
          ...children,
        ],
      ),
    );
  }

  Widget _buildRow(String label, String value) {
    return Container(
      padding: const EdgeInsets.all(12),
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.02),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.border),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
          Text(value, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
        ],
      ),
    );
  }

  Widget _buildDropdownRow(String label, String value, List<String> opts) {
    return Container(
      padding: const EdgeInsets.all(12),
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.02),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.border),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
          Text(value, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppTheme.accent)),
        ],
      ),
    );
  }

  Widget _buildToggleRow(String label, bool value) {
    return Container(
      padding: const EdgeInsets.all(12),
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.02),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.border),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
          Container(
            width: 40,
            height: 20,
            decoration: BoxDecoration(
              color: value ? AppTheme.accent : Colors.white.withOpacity(0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Align(
              alignment: value ? Alignment.centerRight : Alignment.centerLeft,
              child: Container(
                margin: const EdgeInsets.all(2),
                width: 16,
                height: 16,
                decoration: const BoxDecoration(color: Colors.white, shape: BoxShape.circle),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActionRow(String label, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(16),
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.02),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.border),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppTheme.textSecondary)),
          Icon(icon, size: 16, color: AppTheme.textSecondary),
        ],
      ),
    );
  }
}

