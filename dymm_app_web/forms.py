from wtforms import Form, StringField, validators, TextAreaField, SubmitField
from wtforms.fields.html5 import EmailField


class ContactENGForm(Form):
    name = StringField(
        label="Name",
        validators=[validators.DataRequired("Please Enter Your Name."),
                    validators.Length(min=0, max=100)],
        description="Name"
    )
    email = EmailField(
        label="Email",
        validators=[validators.DataRequired("Please Enter Email address."),
                    validators.Email()],
        description="Email"
    )
    message = TextAreaField(
        label="Message",
        validators=[validators.DataRequired("Please Enter Message."),
                    validators.Length(min=0, max=600)],
        description="Message"
    )
    submit = SubmitField(label="Submit")


class ContactKORForm(Form):
    name = StringField(
        label="Name",
        validators=[validators.DataRequired("Please Enter Your Name."),
                    validators.Length(min=0, max=100)],
        description="성명"
    )
    email = EmailField(
        label="Email",
        validators=[validators.DataRequired("Please Enter Email address."),
                    validators.Email()],
        description="메일주소"
    )
    message = TextAreaField(
        label="Message",
        validators=[validators.DataRequired("Please Enter Message."),
                    validators.Length(min=0, max=600)],
        description="전할 말"
    )
    submit = SubmitField(label="보내기")
