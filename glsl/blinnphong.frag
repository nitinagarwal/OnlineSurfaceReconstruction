#version 430

in FRAG_IN
{
	vec4 pos;	
	vec4 color;
	vec3 n;
} frag;

out vec4 result;

void main(void)
{
	vec3 h = normalize(-frag.pos.xyz);
	vec3 normal = normalize(frag.n.xyz);

	float diffuseFactor = 0.1 + 0.7 * max(0.0, abs(normalize(normal.xyz).z));
	
	//Inside faces
	if(!gl_FrontFacing)
		diffuseFactor *= 0.5;

	float specularFactor = pow(abs(dot(h, normal)), 75);	
	
	result = vec4(diffuseFactor * frag.color.rgb, frag.color.a) + specularFactor * vec4(1, 1, 1, 0);

	//Gamma correction
	const float gamma = 2.2 * 1.2;
	result.rgb = pow(result.rgb, vec3(1.0 / gamma));
}