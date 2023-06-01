/* Api urls and method */
export const webUrls = {
	TOKEN_URL: 'api/student/v2/auth/token/', /*post */
	ALL_PREFRENCE_URL: 'api/student/get_all_preferences/', /*get */
	PROFILE_URL: 'api/student/'/* {student_id} */,/* get */
	LOGIN_URL: 'api/student/login', /*post */
	FORGOT_PASS_URL: "api/student/forgot_password"/* mobile=mob&new_password=pass */, /* post*/
	SEND_OTP: "api/send_otp/"/*?mobile=mobile_number*/, /*post */
	REGISTRATION_URL: "api/student/register", /*post */
	COURSE_OVERVIEW_URL: "api/student/course/course_overview/"/*{course_slug}*/, /*post */
	SUBSCRIPTION_PLANS_URL: "api/student/subscription_plans/course/"/*{course_slug}*/, /*get */
	CREATE_ORDER_ID_URL: "api/create_razorpay_order_id/", /* post*/
	PLACE_ORDER_URL: "api/place_order", /*post */
	PLACE_MANUAL_ORDER_URL: "api/place_manual_order", /*post */
	GET_COUPON_URL: "api/student/get_coupons_by_student/", /* post*/
	APPLY_COUPON_URL: "api/student/apply_coupon/", /*post */
	GET_LIVE_CLASSES_URL: "api/student/get_live_classes"/*{course_slug}*/, /* get*/
	COURSE_DETAILS1_URL: "api/student/course_details1"/*{c_slug } */, /* post*/
	COURSE_CATEGORY_URL: "api/student/course_category"/*{course_slug }/{category_slug }/{student_id } */, /* post*/
	TESTSERIES_URL: "api/student/test_series"/*{test_series_id} */, /*get */
	TESTSERIES_PACKAGE_URL: "api/exam_study_material/test_series/package/", /*post */
	STUDY_MATERIAL_LABLE_URL: "api/study_material_labels/v1"/*{course_id }/{student_id } */, /* get*/
	EACH_COURSE_PREFRENCE_URL: "api/student/get_each_preference_courses/mppsc-civil-services", /*get */
	UPDATE_STUDENT_URL: "api/student/update_student_details/", /* put*/
    TEST_RECORD_URL:"api/student/test_record/"/*post */
}

