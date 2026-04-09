# Instructions for all AI and human workers developing this project

## Editing & Updating Changelogs
- Always update the changelogs in the .github/Changelogs/changelogs.md file after every update.
- Make a changelog report containing basic details like timestamp, changes and a code under the latest version name in the file only, do not create new version name. Each changelog report should have a code and a matching .md file like code.md. The separate md file should detail what was the aim of the change, what was changed, what was the result of the change, what you inspected to determine course of action, the tests done on the app after the change and detailing of what you've understood overall.
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