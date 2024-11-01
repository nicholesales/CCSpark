from cryptography.fernet import Fernet
from django.conf import settings

# Create a Fernet object using the encryption key from settings
fernet = Fernet(settings.ENCRYPTION_KEY)

def encrypt_data(data):
    # Encrypts the given data.
    return fernet.encrypt(data.encode()).decode()

def decrypt_data(encrypted_data):
    # Decrypts the given encrypted data.
    return fernet.decrypt(encrypted_data.encode()).decode()
