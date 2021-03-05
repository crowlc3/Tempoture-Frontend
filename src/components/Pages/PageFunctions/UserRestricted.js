import {url} from "./../../../index"

export const update_location = async (name,zipcode,country) => {
    var updateFormData = new FormData();
    updateFormData.append('display_name',name);
    updateFormData.append('zip_code',zipcode);
    updateFormData.append('country',country);
    let updateResp =  await fetch(url + 'update_location', {
        method: 'POST',
        body: updateFormData
    });
    let updateData = await updateResp.json();
    console.log(updateData);
}
