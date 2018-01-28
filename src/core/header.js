/*
       ______________________________________________
     .|                                              |
    |#|     __________   __________   __________     |
    |#|    |::::::::::| |::::::::::| |::::::::::|    |
    |#|    |:+:|        |:+:|        |:+:|           |
    |#|    |+:+|____    |+:+|____    |+:+|____       |
    |#|    |+#++:++#|   |+#++:++#|   |+#++:++#|      |
    |#|    |+#+|        |+#+|        |+#+|           |
    |#|    |#+#|______  |#+#|______  |#+#|______     |
    |#|    |##########| |##########| |##########|    |
    |#|                                              |
    |#|______________________________________________|
    |################################################' 

EEE (read "triple E")

author  : Kalev Mölder
website : tinkering.ee
email   : artkalev@gmail.com

This is a WebGL graphics/game engine.
I am writing this for my own education, pleasure and use.
So keep in mind that this engine should not be used for production.
It is more fit for experimentation.

That being said, this engine could become more stable and easily usable
in the future.

PS. no documentation exists at this time
*/

var EEE = {};

// CONSTANTS

// type constants
EEE.MATH_VECTOR2 = 0x0002;
EEE.MATH_VECTOR3 = 0x0003;
EEE.MATH_VECTOR4 = 0x0004;
EEE.MATH_QUATERNION = 0x0005;
EEE.MATH_MATRIX3 = 0x0006;
EEE.MATH_MATRIX4 = 0x0007;

EEE.GRAPHICS_MESH = 0x0010;
EEE.GRAPHICS_SPRITE = 0x0011;

// gl constants
// copied from : https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
// used to define gl properties in graphics objects before gl context is present

// primitive drawtypes
EEE.GL_POINTS = 0x0000;
EEE.GL_LINES = 0x0001;
EEE.GL_LINE_LOOP = 0x0002;
EEE.GL_LINE_STRIP = 0x0003;
EEE.GL_TRIANGLES = 0x0004;
EEE.GL_TRIANGLE_STRIP = 0x0005;
EEE.GL_TRIANGLE_FAN = 0x0006;

// blending modes
EEE.GL_ZERO = 0;
EEE.GL_ONE = 1;
EEE.GL_SRC_COLOR = 0x0300;
EEE.GL_ONE_MINUS_SRC_COLOR = 0x0301;
EEE.GL_SRC_ALPHA = 0x0302;
EEE.GL_ONE_MINUS_SRC_ALPHA = 0x0303;
EEE.GL_DST_ALPHA = 0x0304;
EEE.GL_ONE_MINUS_DST_ALPHA = 0x0305;
EEE.GL_DST_COLOR = 0x0306;
EEE.GL_ONE_MINUS_DST_COLOR = 0x0307;
EEE.GL_SRC_ALPHA_SATURATE = 0x0308;
EEE.GL_CONSTANT_COLOR = 0x8001;
EEE.GL_ONE_MINUS_CONSTANT_COLOR = 0x8002;
EEE.GL_CONSTANT_ALPHA = 0x8003;
EEE.GL_ONE_MINUS_CONSTANT_ALPHA = 0x8004;

// blending equations
EEE.GL_FUNC_ADD = 0x8006;
EEE.GL_FUNC_SUBTRACT = 0x800A;
EEE.GL_FUNC_REVERSE_SUBTRACT = 0x800B;

// textures
EEE.GL_NEAREST = 0x2600;
EEE.GL_LINEAR = 0X2601;
EEE.GL_NEAREST_MIPMAP_NEAREST = 0x2700;
EEE.GL_LINEAR_MIPMAP_NEAREST = 0x2701;
EEE.GL_NEAREST_MIPMAP_LINEAR = 0x2702;
EEE.GL_LINEAR_MIPMAP_LINEAR = 0x2703;
EEE.GL_TEXTURE_MAG_FILTER = 0x2800;
EEE.GL_TEXTURE_MIN_FILTER = 0x2801;
EEE.GL_TEXTURE_WRAP_S = 0x2802;
EEE.GL_TEXTURE_WRAP_T = 0x2803;
EEE.GL_TEXTURE_2D = 0x0DE1;
EEE.GL_TEXTURE = 0x1702;
EEE.GL_TEXTURE_CUBE_MAP = 0x8513;
EEE.GL_TEXTURE_BINDING_CUBE_MAP = 0x8514;
EEE.GL_TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
EEE.GL_TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
EEE.GL_TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
EEE.GL_TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
EEE.GL_TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
EEE.GL_TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A;
EEE.GL_MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C;
EEE.GL_REPEAT = 0x2901;
EEE.GL_CLAMP_TO_EDGE = 0x812F;
EEE.GL_MIRRORED_REPEAT = 0x8370;

// uniform types
EEE.UNIFORM_SAMPLER2D = 0x0000;
EEE.UNIFORM_MATRIX4 = 0x0001;
EEE.UNIFORM_VEC4 = 0x0002;

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