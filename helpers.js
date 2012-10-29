var dust = require('dustjs-helpers'),
    models = require('./models');

dust.helpers["cloudinary"] = function (chunk, context, bodies, params) {
    var picture = context.get(params.path);
    return chunk.write(
        require('cloudinary').url(
            picture.public_id + '.' + (params.format || picture.format), {
                width: params.width,
                height: params.height,
                type: params.type,
                crop: params.crop,
                gravity: params.gravity,
                radius: params.radius,
                quality: params.quality
            }
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

