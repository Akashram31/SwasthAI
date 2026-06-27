"""
============================================================
SwasthAI
Utility Functions
============================================================
"""


def convert_age_to_category(age: int) -> int:
    """
    Convert actual age (years) into the BRFSS age category
    used during model training.

    Categories:
        1  -> 18–24
        2  -> 25–29
        3  -> 30–34
        4  -> 35–39
        5  -> 40–44
        6  -> 45–49
        7  -> 50–54
        8  -> 55–59
        9  -> 60–64
        10 -> 65–69
        11 -> 70–74
        12 -> 75–79
        13 -> 80+
    """

    if not isinstance(age, int):
        raise TypeError("Age must be an integer.")

    if age < 18:
        raise ValueError("Age must be at least 18 years.")

    if age <= 24:
        return 1
    elif age <= 29:
        return 2
    elif age <= 34:
        return 3
    elif age <= 39:
        return 4
    elif age <= 44:
        return 5
    elif age <= 49:
        return 6
    elif age <= 54:
        return 7
    elif age <= 59:
        return 8
    elif age <= 64:
        return 9
    elif age <= 69:
        return 10
    elif age <= 74:
        return 11
    elif age <= 79:
        return 12
    else:
        return 13