# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from post.models import Post
from rest_framework import status, generics
from serializers import PostSerializer

def post(request,post_id):
	return render(request,'post.html',{'id':post_id})

class PostList(generics.ListCreateAPIView):
	def get(self, request,format=None):
		post = Post.objects.all().order_by('-date')
		serializer = PostSerializer(post,many=True)
		return Response(serializer.data)
	@permission_classes((IsAdminUser,))
	def post(self,request,format=None):
		user = request.user
		serializer = PostSerializer(data=request.data,context={'user':user})
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data,status=status.HTTP_201_CREATED)
		return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer
