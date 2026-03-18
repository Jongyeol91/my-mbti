'use client';

import { motion } from 'framer-motion';
import { getAllProfiles } from '@/lib/profiles';
import { TYPE_GROUPS, TYPE_GROUP_LABELS } from '@/lib/profiles';
import type { MBTIType } from '@/types/mbti';
import TypeCard from './TypeCard';

export default function TypeGrid() {
  const allProfiles = getAllProfiles();
  const profileMap = new Map(allProfiles.map((p) => [p.type, p]));

  return (
    <div className="space-y-10 sm:space-y-12 md:space-y-14">
      {Object.entries(TYPE_GROUPS).map(([groupKey, types], groupIdx) => {
        const groupInfo = TYPE_GROUP_LABELS[groupKey];

        return (
          <motion.section
            key={groupKey}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: groupIdx * 0.1, duration: 0.5 }}
          >
            {/* Group header */}
            <div className="mb-4 text-center sm:mb-6">
              <span className="text-2xl sm:text-3xl">{groupInfo.emoji}</span>
              <h2 className="mt-1 text-lg font-bold sm:text-xl md:text-2xl">
                {groupInfo.label}
              </h2>
            </div>

            {/* Type cards grid - 2 cols mobile, 4 cols tablet+ */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 md:grid-cols-4 sm:gap-4 md:gap-5">
              {(types as MBTIType[]).map((type, i) => {
                const profile = profileMap.get(type);
                if (!profile) return null;
                return (
                  <TypeCard
                    key={type}
                    profile={profile}
                    index={groupIdx * 4 + i}
                  />
                );
              })}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
