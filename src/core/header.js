////////
// EEE //
////////

var EEE = {};

// type enums
EEE.MATH_VECTOR2 = 0x000002;
EEE.MATH_VECTOR3 = 0x000003;
EEE.MATH_VECTOR4 = 0x000004;
EEE.MATH_QUATERNION = 0x000005;
EEE.MATH_MATRIX3 = 0x000006;
EEE.MATH_MATRIX4 = 0x000007;

EEE.GRAPHICS_MESH = 0x000010;
EEE.GRAPHICS_SPRITE = 0x000011;

// global variables
EEE.time = Date.now() / 1000;
EEE.deltaTime = 0;

// assets object
EEE.ASSETS = {
    meshes : {},
    textures : {},
    audio : {},
    prefabs : {}
};