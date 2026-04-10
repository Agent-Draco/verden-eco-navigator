### Original Code (`Meta/Instructions.md`)

This was the previous version of the instructions file, which lacked clear formatting and structure.

```markdown
# Instructions for all AI and human workers developing this project

## Editing & Updating Changelogs
- Always update the changelogs in the Meta/Changelogs/changelogs.md file after every update.
- Make a changelog report containing basic details like timestamp, changes and a code under the latest version name in the file only. **Do not create, modify, or delete any version headings (e.g., `## 2.0.2 (Stable Release 3)`). These headings are exclusively managed by the human developer.** Each changelog report should have a code and a matching .md file like code.md. The separate md file should detail what was the aim of the change, what was changed, what was the result of the change, what you inspected to determine course of action, the tests done on the app after the change and detailing of what you've understood overall.
- Note that the versions refer to the publicated versions. All changelog reports under a version heading are all the changes that lead up to the next published version. Non-published base project or prototype isn't there in changelogs.md.
- Make a new changelog file named like {code}DPR.md which contains the exact lines of code which you changed and how they were originally.

## Directory creation & feature making
-When a new feature or directory is created, always make a structure.md inside that folder which details what you will find overall in this folder or a summary, the details of the folders found in it and the exact usages of the files directly in that folder. When a new file is made, always update all related structure.md files.

## Project Navigation and files
-There are `structure.md` files in every single directory for your convenience and efficiency. Always read them to understand the project structure and file usages. Do not waste your time randomly searching. Read only the structure.md files to navigate.

## Cesium Rendering Policy

All vehicle movement and navigation camera behavior must follow Cesium-native transform pipelines.

Rules:

1. Vehicle entities must use SampledPositionProperty.

2. Vehicle orientation must use VelocityOrientationProperty.

3. Camera-follow logic must execute only inside:

viewer.scene.preUpdate.addEventListener(...)

Camera updates must never run inside React lifecycle hooks such as:

useEffect
useState
render loops

4. Navigation camera must use:

Cesium.Transforms.eastNorthUpToFixedFrame

with:

viewer.camera.lookAtTransform(...)

5. Route polylines must use:

PolylineGlowMaterialProperty

and:

clampToGround = true

6. viewer.trackedEntity must not be used for navigation mode.

7. viewer.flyTo(route) and viewer.zoomTo(route) must not override navigation-follow camera behavior.

Agents modifying vehicle or camera logic must follow these rules.

## GLB Vehicle Alignment Policy

Vehicle models must align with Cesium east-north-up reference frames.

Requirements:

Forward axis must match Cesium heading direction.

If model forward axis differs from Cesium +X forward convention:

apply headingPitchRollQuaternion transform correction.

Manual Euler rotation must not be used.

modelMatrix overrides must not replace entity orientation pipelines.

## Navigation Camera Ownership

Navigation mode camera behavior has priority over:

viewer.zoomTo
viewer.flyTo
viewer.trackedEntity

Camera follow must remain active once navigation starts.

Only the navigation camera controller may modify viewer.camera state during active routing.
```

### Modified Code (`Meta/Instructions.md`)

This is the new, reformatted version with improved clarity, structure, and detail.

```markdown
# AI Assistant Instructions

This document outlines the rules and guidelines for the AI assistant to follow during project development. Adherence to these instructions is critical for maintaining code quality, project structure, and workflow consistency.

---

## 1. Changelog & Documentation Protocol

All changes, fixes, or new features must be meticulously documented. This process involves three distinct files for every change.

### 1.1. Versioning Policy

*   **Human-Managed Versions**: Version headings (e.g., `## 2.0.2 (Stable Release 3)`) in `Meta/Changelogs/changelogs.md` are exclusively managed by the human developer. **DO NOT** create, modify, or delete these headings.
*   **Appending Entries**: Always add new changelog entries under the most recent version heading present in the file.

### 1.2. Changelog Entry Workflow

For every contribution, the following three files must be created and/or updated:

1.  **Main Changelog (`Meta/Changelogs/changelogs.md`)**
    *   Add a single-line entry for your change under the latest version. This line includes the assigned code, date, and a brief title.

2.  **Detailed Report (`Meta/Changelogs/{code}.md`)**
    *   Create a new markdown file named after the assigned code (e.g., `FIX-006.md`).
    *   This report must contain the following sections:
        *   **Aim of the change:** What was the primary goal?
        *   **What was changed:** A summary of the modifications.
        *   **Result of the change:** The outcome of your work.
        *   **Inspection & Course of Action:** How did you determine what to do?
        *   **Tests Done:** What steps did you take to verify the change?
        *   **Detailing of what you've understood overall:** Your summary of the task.

3.  **Diff Pull Request (`Meta/Changelogs/{code}DPR.md`)**
    *   Create a new markdown file showing the exact code differences.
    *   Use this format:
        *   A `### Original Code` section with a code block showing the file before your changes.
        *   A `### Modified Code` section with a code block showing the file after your changes.

---

## 2. Filesystem & Codebase Architecture

### 2.1. Project Navigation

*   **Use `structure.md` for Guidance**: Every significant directory contains a `structure.md` file. **Always** read these files to understand the project structure and the purpose of each file. This is the most efficient way to navigate the codebase.

### 2.2. Directory & File Creation

*   **Update Structure on Change**: When creating a new feature, directory, or file, you **must** update all relevant `structure.md` files to reflect the changes. This includes creating a new `structure.md` for any new directory.

---

## 3. CesiumJS Development Policies

These are strict, non-negotiable rules for implementing CesiumJS features.

### 3.1. Core Rendering & Transform Pipeline

1.  **Positioning**: Vehicle entities **must** use `Cesium.SampledPositionProperty`.
2.  **Orientation**: Vehicle orientation **must** use `Cesium.VelocityOrientationProperty`.
3.  **Camera Updates**: Camera-follow logic **must** execute within `viewer.scene.preUpdate.addEventListener(...)` and **must not** be tied to React lifecycle hooks (`useEffect`, `useState`, etc.).
4.  **Camera Transform**: The navigation camera **must** use `Cesium.Transforms.eastNorthUpToFixedFrame` combined with `viewer.camera.lookAtTransform(...)`.
5.  **Route Lines**: Route polylines **must** use `PolylineGlowMaterialProperty` and have `clampToGround = true`.

### 3.2. GLB Model Alignment

*   **Objective**: Ensure the vehicle model's forward direction aligns with its heading in the Cesium scene.
*   **Method**: If the model's natural forward axis (e.g., +Y in Blender) does not align with Cesium's +X `east-north-up` frame, you **must** apply a correction using `Cesium.Transforms.headingPitchRollQuaternion`.
*   **Prohibitions**:
    *   Do not use manual Euler rotations.
    *   Do not override the entity's orientation pipeline with a `modelMatrix`.

### 3.3. Navigation Camera Ownership

*   **Priority**: The navigation camera controller has absolute authority over the camera during active routing.
*   **Precedence**: Its behavior overrides `viewer.zoomTo`, `viewer.flyTo`, and `viewer.trackedEntity`.
*   **Continuity**: The follow-camera behavior **must** remain active and uninterrupted once navigation begins.
```