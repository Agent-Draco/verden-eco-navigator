# Structure.md (src/lib)

## Overview
This directory contains utility functions and shared library code for the application.

## Files
- **utils.ts** - Standard Tailwind merge and class-variance helpers.
- **navUtils.ts** - Navigation-specific logic for ETA, distance, and route processing.
- **distance.ts** - Geolocation helper functions (Haversine formula).
- **navLabelRanker.ts** - Navigation label ranking resolver. Assigns priority categories (shop > building > area > city > highway) to OSM/Nominatim results and OSRM step labels. Exports `resolveNavLabel()` and `formatInstruction()` used by Navigation.tsx.
