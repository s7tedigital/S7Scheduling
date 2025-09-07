import React from 'react';
import { ScheduleSuggestion } from '../../services/geminiService';

interface GanttChartProps {
  schedule: ScheduleSuggestion[];
}

const GanttChart: React.FC<GanttChartProps> = ({ schedule }) => {
  const START_HOUR = 8; // 8 AM
  const END_HOUR = 18; // 6 PM
  const totalHours = END_HOUR - START_HOUR;

  const timeSlots = Array.from({ length: totalHours }, (_, i) => START_HOUR + i);

  // Helper to parse duration from strings like "Morning (4 hours)"
  const parseDuration = (estimatedTime: string): number => {
    const match = estimatedTime.match(/\((\d+)/);
    return match ? parseInt(match[1], 10) : 2; // Default to 2 hours if not specified
  };
  
  // A few colors for the scene bars
  const colors = [
    'bg-blue-500 border-blue-700',
    'bg-green-500 border-green-700',
    'bg-purple-500 border-purple-700',
    'bg-yellow-500 border-yellow-700',
    'bg-indigo-500 border-indigo-700',
  ];

  return (
    <div className="w-full overflow-x-auto bg-slate-50 dark:bg-slate-900/50 p-4 rounded-b-lg">
      <div 
        className="grid min-w-[800px]"
        style={{
          gridTemplateColumns: `120px repeat(${totalHours}, 1fr)`,
          gridTemplateRows: `auto repeat(${schedule.length}, minmax(60px, auto))`,
          gap: '4px'
        }}
      >
        {/* Header: Empty corner + Time slots */}
        <div className="sticky left-0 bg-slate-50 dark:bg-slate-900/50 z-10"></div>
        {timeSlots.map(hour => (
          <div key={hour} className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
            {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
          </div>
        ))}
        
        {/* Chart Body: Day labels + Scene bars */}
        {schedule.map((day, dayIndex) => {
          let currentHourOffset = 0;

          return (
            <React.Fragment key={dayIndex}>
              {/* Day Label Column */}
              <div 
                className="font-bold text-sm text-slate-700 dark:text-slate-300 p-2 sticky left-0 bg-slate-100 dark:bg-slate-800/50 flex flex-col justify-center rounded-l-md z-10"
                style={{ gridRow: dayIndex + 2, gridColumn: 1 }}
              >
                 <span>{day.day}</span>
                 <span className="text-xs font-normal text-slate-500">{day.date}</span>
              </div>

              {/* Scene Bars for the day */}
              {day.scenes.map((scene, sceneIndex) => {
                const duration = parseDuration(scene.estimatedTime);
                const startCol = currentHourOffset + 2; // +1 for grid index, +1 for day label column
                
                // For the next scene in the same day
                currentHourOffset += duration;

                if ((startCol - 2 + duration) > totalHours) {
                    // This scene overflows the visible day, handle gracefully
                    console.warn(`Scene ${scene.sceneNumber} on ${day.date} exceeds the scheduled day time.`);
                    return null;
                }

                return (
                  <div
                    key={sceneIndex}
                    className={`rounded-md p-2 text-white text-xs overflow-hidden transition-transform hover:scale-105 hover:z-20 relative border-l-4 ${colors[sceneIndex % colors.length]}`}
                    style={{
                      gridRow: dayIndex + 2,
                      gridColumn: `${startCol} / span ${duration}`,
                    }}
                    title={`Scene ${scene.sceneNumber} (${scene.location}) - ${scene.estimatedTime}`}
                  >
                    <p className="font-bold truncate">Scene {scene.sceneNumber}</p>
                    <p className="truncate opacity-80">{scene.location}</p>
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
       {schedule.length === 0 && (
          <div className="text-center py-10 col-span-full">
              <p className="text-slate-500 dark:text-slate-400">No schedule to display.</p>
          </div>
      )}
    </div>
  );
};

export default GanttChart;
