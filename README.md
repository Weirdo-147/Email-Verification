
# Email Verification Project

[Live Application: https://quantum-death.onrender.com](https://quantum-death.onrender.com)

This project implements an email verification system using a Django backend and a React frontend.

## Installation

Use the following instructions to set up the project:

### Backend (Django)

```bash
cd path/to/email_ver
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
```

### Frontend (React)

```bash
cd path/to/email_ver/front
npm install
```

## Usage

To start the application:

### Backend (Django)

```bash
cd path/to/email_ver
python manage.py runserver
# The backend will run on http://localhost:8000
```

### Frontend (React)

```bash
cd path/to/email_ver/front
npm start
# The frontend will run on http://localhost:2374
```

## Accessing the Application

1. Open your web browser.
2. Go to http://localhost:2374.
3. The React frontend will communicate with the Django backend.

## Troubleshooting

- If you encounter CORS issues, check Django settings for proper frontend URL allowance.
- Ensure both servers are running on the correct ports.
- Verify the React app is configured to send requests to the correct Django backend URL.

## Additional Information
- For backend API documentation, refer to [Backend API Docs](link-to-your-api-docs) (if available).
- To access Django admin, create a superuser with `python manage.py createsuperuser` and visit `http://localhost:8000/admin`.

## Contact
- If you encounter any issues or have questions, please contact noreply.quantumauth@gmail.com.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
