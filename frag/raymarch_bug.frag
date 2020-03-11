// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float scene(vec3 ray) {
    // ray = -sin(u_time + ray) + cos(u_time + ray);
    // float floor = sin(ray.y + 2.) - cos(ray.x * 4.) + 0.5;
    float radius = 0.2;
    float sphere = length(ray) - radius;
    return sphere;
}

vec4 trace(vec3 rayOrigin, vec3 dir) {
    vec3 ray = rayOrigin;
    float dist = 0.;
    float totalDist = 0.;
    float maxDist = 5.;

    for (int i = 0; i < 16; i++) {
        dist = scene(ray);
        ray += dist * dir;
        if (dist <= 0.01) {
            return 1. - vec4(totalDist / maxDist);
        }
        totalDist += dist;
    }
    return vec4(0.);
}
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec2 uv = (st*2.0) - 1.0;

    vec3 color = vec3(0.);
    color = vec3(st.x,st.y,abs(sin(u_time)));

    vec3 camOrigin = vec3(0., 0., -1.);
    vec3 rayOrigin = vec3(camOrigin.xy  + uv, camOrigin.z + 1.);
    vec3 direction = rayOrigin - camOrigin;

    gl_FragColor = trace(rayOrigin, direction);
}
