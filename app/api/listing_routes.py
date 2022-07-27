from flask import Blueprint, jsonify, request
from app.models.user import User
from app.models.listing import Listing
from app.forms.listing_form import ListingCreateForm, ListingUpdateForm
from app.models.image import Image
# from app.forms.images_form import ImageCreateForm, ImageUpdateForm
from app.models.review import Review
from app.forms.review_form import ReviewCreateForm, ReviewUpdateForm
from app.models import db
from app.api.aws_s3_bucket import upload_file_to_s3, allowed_file, get_unique_filename

listing_routes = Blueprint("listing_routes", __name__)

@listing_routes.route("/")
def all_listings():
    listings = Listing.query.all()
    return {"listings": [listing.to_dict() for listing in listings]}

@listing_routes.route("/<int:id>")
def get_listing(id):
    listing = Listing.query.get(id)
    return listing.to_dict()

@listing_routes.route("/", methods=["POST"])
def create_listing():
    form = ListingCreateForm()
    listings = Listing.query.all()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # if request.files:
        #     image = request.files["image"]
        #     if not allowed_file(image.filename):
        #         return {"errors":"file type not permitted"}, 400

        #     image.filename = get_unique_filename(image.filename)

        #     upload = upload_file_to_s3(image)
        #     if "url" not in upload:
        #         return upload, 400

        #     url = upload["url"]
        # else:
        #     url =None

        listing = Listing(
            description=form.description.data,
            price=form.price.data,
            size=form.size.data,
            is_available=form.is_available.data,
            year_built=form.year_built.data,
            parking=form.parking.data,
            laundry=form.laundry.data,
            bedrooms=form.bedrooms.data,
            bathrooms=form.bathrooms.data,
            address=form.address.data,
            country=form.country.data,
            city=form.city.data,
            state=form.state.data,
            url1=form.url1.data,
            url2=form.url2.data,
            url3=form.url3.data,
            lat=form.lat.data,
            lng=form.lng.data,
            user_id=form.user_id.data,
            agent_id=form.agent_id.data,
            # images_of_listing=form.images_of_listing.data
        )
        print("\n\n\n\n\n", images_of_listing)

        db.session.add(listing)
        db.session.commit()

        return listing.to_dict()
    return {"errors": form.errors}, 400

@listing_routes.route("/<int:id>", methods=["PUT"])
def update_listing(id):
    listing = Listing.query.get(id)
    # print("befor form \n\n\n\n")
    form = ListingUpdateForm()
    # print("after form \n\n\n\n")
    form['csrf_token'].data = request.cookies['csrf_token']
    # print("form.description \n\n", form.description.data)
    # print("form.price \n\n", form.price.data)
    # print("form.is_available \n\n", form.is_available.data)
    # print("form \n\n\n", form.data)
    if form.validate_on_submit():
        # current_user = User.query.get(form.user_id.data)
        if request.files:
            image = request.files["image"]
            if not allowed_file(image.filename):
                return {"errors":"file type not permitted"}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return upload, 400

            url = upload["url"]

        listing.description = form.description.data
        listing.price = form.price.data
        listing.url1 = form.url1.data
        listing.url2 = form.url2.data
        listing.url3 = form.url3.data
        listing.is_available = form.is_available.data

        db.session.add(listing)
        db.session.commit()

        return listing.to_dict()
    return jsonify(form.errors), 400

@listing_routes.route("/<int:id>", methods=["DELETE"])
def delete_listing(id):
    listing = Listing.query.get(id)
    db.session.delete(listing)
    db.session.commit()
    return listing.to_dict()


@listing_routes.route("/images", methods=['POST'])
def add_listing_images():
    newFile = request.form.get('newFile')
    print(newFile)
    if newFile == 'true':
        if "file" not in request.files:
            return "No user_file key in request.files"
        file = request.files['file']

        if file:
            listing_id = request.form.get('spot_id')
            file_url = upload_file_to_s3(file)
            # file_url = file_url.replace(" ", "+")
            image = Image(listing_id=listing_id, url=file_url["url"])
            db.session.add(image)
            db.session.commit()

    if newFile == 'false':
        listing_id = request.form.get('listing_id')
        url = request.form.get('file')
        print(listing_id)
        print(url)
        image = Image(listing_id=listing_id, url=url)
        db.session.add(image)
        db.session.commit()

    return {'message': 'okay'}
