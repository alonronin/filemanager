var dust = require('dustjs-helpers'),
    models = require('./models');

dust.helpers["cloudinary"] = function (chunk, context, bodies, params) {
    context = params && params.path ? context.get(params.path) : context.current();

    if(!context.public_id) return chunk;

    params.format = params.format || context.format;

    return chunk.write(
        require('cloudinary').url(
            context.public_id, params
        )
    )
};

/*dust.helpers['banners'] = function(chunk, context, bodies) {
    return chunk.map(function(chunk) {
        models.banners.find().where('show', 1).sort({order: 1}).exec(function(err, banners){
            banners.forEach(function(banner){
                context = context.push(banner);
                chunk.render(bodies.block, context)
            });
            chunk.end();
        })
    })
};*/

