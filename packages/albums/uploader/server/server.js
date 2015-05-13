Cloudinary = Npm.require("cloudinary");
var Future = Npm.require('fibers/future');
var stream_buffers = Npm.require("stream-buffers");

var _cloudinary_stream = new Meteor.Stream("c_stream");

_cloudinary_stream.permissions.read(function() {
	return true;
});

cloudinary_delete = function(public_id){
    var future = new Future();
    var ids;

    ids = [public_id];

    Cloudinary.api.delete_resources(ids,function(result){
        future.return(result);
    });

    return future.wait();
};

Meteor.methods({
	cloudinary_upload_stream:function(file,options){
		this.unblock();

		var file_stream_buffer = new stream_buffers.ReadableStreamBuffer({
			frequency:10,
			chunkSize:2048
		});

		var buffer = new Buffer(file);
		file_stream_buffer.put(buffer);

		var future = new Future();
		var stream = Cloudinary.uploader.upload_stream(function(result){
			if(result && !result.error) {
				_.extend(result,{total_uploaded:result.bytes,percent_uploaded:100,uploading:false});

				_cloudinary_stream.emit("upload",result,options);
			}

			future.return(result);
		});

		var total_buffer_size = buffer.length;
		var total_uploaded = 0;

		file_stream_buffer.on("data",function(data){
			total_uploaded += data.length;
			var percent_uploaded = Number(((total_uploaded / total_buffer_size) * 100).toFixed(0));

			var upload_stats = {
				total_uploaded: total_uploaded,
				percent_uploaded: percent_uploaded,
				uploading:true
			};

            if(options.context && options.context.type){
                upload_stats.role = options.context.type;
            }

			_cloudinary_stream.emit("upload",upload_stats,options);

			stream.write(data);
		});

		file_stream_buffer.on("end",stream.end);

		if(future.wait() && !future.wait().error){
            var album = options.context;
            var uploadData = future.wait();

            var record = {userId:Meteor.userId(), albumId:album._id, publicId:uploadData.public_id};

            if(album.type){
                record.type = album.type;
                if(album.type === "profile"){
                    var user = User.createEmpty(Meteor.userId());
                    user.update({$set:{avatarId:record.publicId}});
                }
            }

			PhotosCollection.insert(record);


			return future.wait();
		} else {
			throw new Meteor.Error("Cloudinary Error",future.wait().error);
		}
	}
});
