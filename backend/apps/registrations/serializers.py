from rest_framework import serializers

from .models import Registration


class NullableCharField(serializers.CharField):
    """Accepts null like the Go API did and stores it as an empty string."""

    def __init__(self, **kwargs):
        kwargs.setdefault("allow_blank", True)
        kwargs.setdefault("allow_null", True)
        kwargs.setdefault("required", False)
        super().__init__(**kwargs)

    def run_validation(self, data=serializers.empty):
        # DRF returns None for null before to_internal_value runs, so handle it here.
        if data is None:
            return ""
        return super().run_validation(data)


class RegistrationSerializer(serializers.ModelSerializer):
    """Request and response fields match the previous Go API."""

    full_name_ru = NullableCharField(max_length=255)
    confchair_paper_id = NullableCharField(max_length=64)
    paper_title = NullableCharField(max_length=500)
    language = serializers.ChoiceField(choices=Registration.Language.choices, required=False)

    class Meta:
        model = Registration
        fields = [
            "id",
            "full_name",
            "email",
            "country",
            "organization",
            "participation_format",
            "full_name_ru",
            "is_presenter",
            "confchair_paper_id",
            "paper_title",
            "language",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate_email(self, value):
        return value.strip()

    def validate(self, attrs):
        if attrs.get("is_presenter") and not attrs.get("paper_title", "").strip():
            raise serializers.ValidationError({"paper_title": "Paper title is required for presenters."})
        if not attrs.get("is_presenter"):
            # The form keeps paper fields after unticking "presenter"; they are not part of the registration.
            attrs["paper_title"] = ""
            attrs["confchair_paper_id"] = ""
        return attrs
