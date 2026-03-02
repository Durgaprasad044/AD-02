"""Factory functions for test data."""

from faker import Faker

fake = Faker()


def make_user():
    return {
        "email": fake.email(),
        "password": "testpass123",
        "name": fake.name(),
    }


def make_post():
    return {
        "content": fake.paragraph(),
    }


def make_event():
    return {
        "title": fake.catch_phrase(),
        "description": fake.paragraph(),
        "event_date": fake.future_datetime().isoformat(),
        "location": fake.city(),
        "capacity": fake.random_int(10, 100),
    }
