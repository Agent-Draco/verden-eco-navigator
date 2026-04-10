import { describe, it, expect } from 'vitest';
import { formatInstruction } from '../lib/navLabelRanker';

describe('formatInstruction', () => {
  it('should return default instruction when step is null or undefined', () => {
    expect(formatInstruction(null)).toBe('Continue on route');
    expect(formatInstruction(undefined)).toBe('Continue on route');
  });

  it('should return "You have arrived" for arrive maneuver', () => {
    const step = {
      maneuver: {
        type: 'arrive',
      },
    };
    expect(formatInstruction(step)).toBe('You have arrived');
  });

  it('should return "Enter the roundabout" for roundabout maneuver', () => {
    const step = {
      maneuver: {
        type: 'roundabout',
      },
    };
    expect(formatInstruction(step)).toBe('Enter the roundabout');
  });

  describe('maneuvers with direction and label', () => {
    const testCases = [
      { type: 'depart', modifier: 'right', name: 'Main St', expected: 'Head right onto Main St' },
      { type: 'turn', modifier: 'left', name: 'Oak Ave', expected: 'Turn left onto Oak Ave' },
      { type: 'continue', modifier: 'straight', name: 'Highway 1', expected: 'Continue straight onto Highway 1' },
      { type: 'merge', modifier: 'slight left', name: 'I-95', expected: 'Merge slight left onto I-95' },
      { type: 'fork', modifier: 'slight right', name: 'Route 66', expected: 'Keep slight right at the fork onto Route 66' },
      { type: 'on ramp', modifier: 'sharp right', name: 'The Slip', expected: 'Take the ramp sharp right onto The Slip' },
      { type: 'off ramp', modifier: 'sharp left', name: 'Exit 12', expected: 'Take the exit sharp left onto Exit 12' },
      { type: 'new name', modifier: '', name: 'Broadway', expected: 'Continue onto Broadway' },
      { type: 'exit roundabout', modifier: '', name: 'Main Square', expected: 'Exit the roundabout onto Main Square' },
    ];

    testCases.forEach(({ type, modifier, name, expected }) => {
      it(`should format "${type}" maneuver correctly`, () => {
        const step = {
          name,
          maneuver: { type, modifier },
        };
        expect(formatInstruction(step)).toBe(expected);
      });
    });
  });

  it('should map "uturn" to "U-turn"', () => {
    const step = {
      name: 'South St',
      maneuver: {
        type: 'turn',
        modifier: 'uturn',
      },
    };
    expect(formatInstruction(step)).toBe('Turn U-turn onto South St');
  });

  describe('unknown inputs', () => {
    it('should pass unknown modifier through', () => {
      const step = {
        name: 'Maple Dr',
        maneuver: {
          type: 'turn',
          modifier: 'sideways',
        },
      };
      expect(formatInstruction(step)).toBe('Turn sideways onto Maple Dr');
    });

    it('should format unknown maneuver type using fallback pattern', () => {
      const step = {
        name: 'Hidden Path',
        maneuver: {
          type: 'teleport',
          modifier: 'up',
        },
      };
      expect(formatInstruction(step)).toBe('teleport up onto Hidden Path');
    });

    it('should return "onto this road" if everything is missing but step is provided', () => {
      const step = {
        maneuver: {},
      };
      // resolveNavLabel returns { text: 'this road', ... } if no name/ref/dest in step
      expect(formatInstruction(step)).toBe('onto this road');
      // Wait, let's check the code:
      // return `${type} ${dir} ${onto}`.trim() || 'Continue on route';
      // if type and dir are empty, and onto is "onto this road"
      // it returns "onto this road"
    });
  });

  describe('integration with nearbyPOIs', () => {
    it('should use nearby POI name if it has higher priority than road name', () => {
      const step = {
        name: 'High St',
        maneuver: { type: 'turn', modifier: 'left' },
      };
      const nearbyPOIs = [
        {
          name: "Joe's Coffee",
          class: 'shop',
          type: 'cafe',
        },
      ];
      // shop priority is 0, highway (road name) is 4.
      expect(formatInstruction(step, nearbyPOIs)).toBe("Turn left onto Joe's Coffee");
    });

    it('should prefer a building over an area', () => {
      const step = {
        name: 'The Woods',
        maneuver: { type: 'turn', modifier: 'right' },
      };
      const nearbyPOIs = [
        {
          name: 'Green Park',
          class: 'landuse',
          type: 'park',
        },
        {
          name: 'Central Library',
          class: 'building',
          type: 'public',
        },
      ];
      // building priority is 1, landuse (area) is 2.
      expect(formatInstruction(step, nearbyPOIs)).toBe('Turn right onto Central Library');
    });
  });
});
