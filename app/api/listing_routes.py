from flask import Blueprint, jsonify, request
from app.models.user import User
from app.models.listing import Listing
from app.forms.listing_form import ListingCreateForm, ListingUpdateForm
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
    # print("Wefwerfgwefgweewwgwegwegw")
    form = ListingCreateForm()
    listings = Listing.query.all()
    print("form ===========", form.data)
    # print("efewfwefwefwe---------", request.files)
    print("listings ===========", listings)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("validate_on_submit")
        if request.files:
            image = request.files["image"]
            if not allowed_file(image.filename):
                return {"errors":"file type not permitted"}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return upload, 400

            url = upload["url"]
        else:
            url =None

        listing = Listing(
            title=form.title.data,
            description=form.description.data,
            price=form.price.data,
            size=form.size.data,
            is_available=form.is_available.data,
            year_built=form.year_built.data,
            parking=form.parking.data,
            laundry=form.laundry.data,
            bedrooms=form.bedrooms.data,
            bathrooms=form.bathrooms.data,
            user_id=form.user_id.data,
        )

        db.session.add(listing)
        db.session.commit()

        return listing.to_dict()
    return jsonify(form.errors), 400

@listing_routes.route("/<int:id>", methods=["PUT"])
def update_listing(id):
    listing = Listing.query.get(id)
    print("listing in backend", listing)
    form = ListingUpdateForm()
    print("===========================")
    print("form in backend", form)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("in api riyutes")
        # current_user = User.query.get(form.user_id.data)
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
        #     url =listing.server_icon_url

        listing.title = form.title.data
        listing.description = form.description.data
        listing.price = form.price.data
        listing.is_available = form.is_available.data
        db.session.add(listing)
        db.session.commit()
        return listing.to_dict()

@listing_routes.route("/<int:id>", methods=["DELETE"])
def delete_listing(id):
    listing = Listing.query.get(id)
    db.session.delete(listing)
    db.session.commit()
    return listing.to_dict()