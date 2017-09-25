from django.conf.urls import *
from rest_framework.urlpatterns import format_suffix_patterns
from post import views

urlpatterns = [
	url(r'^(?P<post_id>\d+)/$',views.post),
	url(r'^api/$',views.PostList.as_view()),
	url(r'^api/(?P<pk>[0-9]+)/$',views.PostDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)