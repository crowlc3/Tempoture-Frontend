import {url} from "./../../../index"

export const update_location = async (name,lat,long,zipcode,country) => {
    var updateFormData = new FormData();
    updateFormData.append('display_name',name);
    updateFormData.append('latitude',lat);
    updateFormData.append('longitude',long);
    updateFormData.append('zipcode',zipcode);
    updateFormData.append('country',country);
    let updateResp =  await fetch(url + 'update_location', {
        method: 'POST',
        body: updateFormData
    });
    let updateData = await updateResp.json();
    console.log(updateData);
}
