EEE.SHADERLIB = {};
EEE.SHADERLIB.vertex = {
    default : [
        "#version 300 es",
        "precision mediump float;",
        "layout(location = 0) in vec3 a_vertex;",
        "layout(location = 1) in vec3 a_normal;",
        "layout(location = 2) in vec4 a_color;",
        "layout(location = 3) in vec2 a_uv0;",
        "layout(location = 4) in vec2 a_uv1;",

        "out vec3 v_vertex;",
        "out vec3 v_normal;",
        "out vec4 v_color;",
        "out vec2 v_uv0;",

        "uniform vec2 u_time;",
        "uniform mat4 u_matrix_model;",
        "uniform mat4 u_matrix_view;",
        "uniform mat4 u_matrix_projection;",

        "void main(){",
        "	v_vertex = a_vertex;",
        "	v_normal = normalize(a_normal);",
        "	v_color = a_color;",
        "	v_uv0 = a_uv0;",
        "	gl_Position = u_matrix_projection * u_matrix_view * u_matrix_model * vec4( a_vertex, 1.0 );",
        "	gl_PointSize = 10.0;",
        "}"
    ].join("\n"),
};
EEE.SHADERLIB.fragment = {
    default:[
        "#version 300 es",
        "precision mediump float;",
        "in vec3 v_vertex;",
        "in vec3 v_normal;",
        "in vec4 v_color;",
        "in vec2 v_uv0;",
        "out vec4 out_color;",

        "uniform vec4 u_diffuse_color;",
        "uniform sampler2D u_diffuse_texture;",

        "void main(){",
        "	out_color = u_diffuse_color * texture( u_diffuse_texture, v_uv0 );",
        "}"
    ].join("\n")
};