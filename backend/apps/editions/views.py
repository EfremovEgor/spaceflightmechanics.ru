from rest_framework import serializers
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Edition


class EditionSerializer(serializers.ModelSerializer):
    registration_open = serializers.SerializerMethodField()

    class Meta:
        model = Edition
        fields = [
            "slug",
            "code",
            "number",
            "year",
            "title_en",
            "title_ru",
            "start_date",
            "end_date",
            "venue_en",
            "venue_ru",
            "site_path",
            "is_current",
            "registration_open",
        ]

    def get_registration_open(self, obj) -> bool:
        return obj.accepts_registrations()


class EditionListView(ListAPIView):
    """All forum years, newest first; used for links to previous sites."""

    queryset = Edition.objects.all()
    serializer_class = EditionSerializer
    pagination_class = None


class EditionDetailView(RetrieveAPIView):
    queryset = Edition.objects.all()
    serializer_class = EditionSerializer
    lookup_field = "slug"
