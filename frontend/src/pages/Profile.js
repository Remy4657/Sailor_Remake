import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const Profile = () => {
    const username = useSelector((state) => state.user.account.username);
    const email = useSelector((state) => state.user.account.email);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const handleChangePassword = (data) => {
        console.log("data: ", data)
    }
    return (
        <div style={{ margin: "150px 0" }}>
            <div className="container emp-profile">

                <div class="row">
                    <div class="col-md-2">
                        <div class="profile-img">
                            <img style={{ width: "-webkit-fill-available" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                            <div style={{ width: "-webkit-fill-available" }} class="file btn">
                                <input style={{ width: "inherit" }} type="file" name="file" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="profile-head">

                            <Tabs>
                                <TabList>
                                    <Tab>Account Information</Tab>
                                    <Tab>Change password</Tab>
                                </TabList>

                                <TabPanel>
                                    <div class="col-md-8">
                                        <div class="tab-content profile-tab" id="myTabContent">
                                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                                <div class="row mt-3">
                                                    <div class="col-md-6">
                                                        <label>Name:</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="email" value={username} className="form-control" id="name" name="name" placeholder="New Password" />
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-md-6">
                                                        <label>Email:</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="email" value={email} className="form-control" id="name" name="name" placeholder="New Password" />

                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-md-6">
                                                        <label>Phone:</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="email" value="123 456 7890" className="form-control" id="name" name="name" placeholder="New Password" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="col-md-2 mt-3">
                                                <input type="submit" class="btn btn-primary profile-edit-btn" name="btnAddMore" value="Save change" />
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <form onSubmit={handleSubmit(handleChangePassword)}>
                                        <div class="mt-5 col-md-12">
                                            <div class="tab-content profile-tab" id="myTabContent">
                                                <div className="col-md-12 form-group mt-3 d-flex flex-column">
                                                    <label className="w-25">Old password:</label>
                                                    <input type="password" className="form-control" id="name" name="name" placeholder="Old Password" {...register("oldPassword", { required: true, minLength: 4 })} />
                                                    {errors.oldPassword?.type === "required" && <span className='error'>Password is required.</span>}
                                                    {errors.oldPassword?.type === "minLength" && (
                                                        <span className="error">Password must be at least 4 characters long.</span>
                                                    )}
                                                </div>
                                                <div className="col-md-12 form-group mt-3 d-flex flex-column">
                                                    <label className="w-25">New password:</label>
                                                    <input type="password" className="form-control" id="name" name="name" placeholder="New Password" {...register("newPassword", { required: true, minLength: 4 })} />
                                                    {errors.newPassword?.type === "required" && <span className='error'>Password is required.</span>}
                                                    {errors.newPassword?.type === "minLength" && (
                                                        <span className="error">Password must be at least 4 characters long.</span>
                                                    )}
                                                </div>
                                                <div className="col-md-12 form-group mt-3 d-flex flex-column">
                                                    <label className="w-25">Confirm password:</label>
                                                    <input type="password" className="form-control" id="name" name="name" placeholder="Confirm password" {...register("cfPassword", { required: true, minLength: 4 })} />
                                                    {errors.cfPassword?.type === "required" && <span className='error'>Password is required.</span>}
                                                    {errors.cfPassword?.type === "minLength" && (
                                                        <span className="error">Password must be at least 4 characters long.</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div class="col-md-2 mt-3">
                                                <input type="submit" class="btn btn-primary profile-edit-btn" name="btnAddMore" value="Save change" />
                                            </div>
                                        </div>
                                    </form>

                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
export default Profile