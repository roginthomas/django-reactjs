from rest_framework import serializers
from post.models import Post

class PostSerializer(serializers.ModelSerializer):
	class Meta:
		model = Post
		fields = ('id','author','title','date','article','tags')

	def create(self, validated_data):
		title = validated_data.get('title',None)
		user = validated_data.get("user")
		article = validated_data.get('article',None)
		tags = validated_data.get('tags',None)
		date = validated_data.get('date',None)
		return Post.object.create(title=title,author=user,article=article,tags=tags,date=date)