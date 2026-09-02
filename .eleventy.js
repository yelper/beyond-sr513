module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.amendLibrary("md", markdownLibrary => {
    const defaultImageRenderer = markdownLibrary.renderer.rules.image
      || ((tokens, index, options, env, renderer) => renderer.renderToken(tokens, index, options));

    markdownLibrary.renderer.rules.image = (tokens, index, options, env, renderer) => {
      const token = tokens[index];
      const classes = [token.attrGet("class"), "img-fluid"].filter(Boolean);

      token.attrSet("class", classes.join(" "));
      return defaultImageRenderer(tokens, index, options, env, renderer);
    };
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes"
    }
  };
};
