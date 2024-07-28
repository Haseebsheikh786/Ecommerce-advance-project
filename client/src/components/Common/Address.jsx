import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { GetLoginUserAsync, selectUserInfo } from "../../pages/auth/authSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAsync } from "../../pages/User/userSlice";
import { useToast } from "../../components/ui/use-toast";
export function Address({
  showDialog,
  setShowDialog,
  editAbleData,
  setEditAbleData,
  index,
  setIndex,
}) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const userInfo = useSelector(selectUserInfo);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");

  const handleAdd = () => {
    const address = {
      name: name,
      email: email,
      phone: phone,
      city: city,
      street: street,
      zip: zip,
    };
    if (editAbleData?.name) {
      const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
      newUser.addresses.splice(index, 1, address);
      dispatch(updateUserAsync(newUser));
      closeDialog();
      setIndex(null);
      toast({
        title: " Successful",
        description: "address updated successfully",
      });
    } else {
      const newUser = {
        ...userInfo,
        addresses: [...userInfo.addresses, address],
      };
      toast({
        title: " Successful",
        description: "address added successfully",
      });
      dispatch(updateUserAsync(newUser));
      closeDialog();
    }
  };

  const closeDialog = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCity("");
    setStreet("");
    setZip("");
    setShowDialog(false);
    if (editAbleData?.name) {
      setEditAbleData({});
    }
  };

  useEffect(() => {
    if (editAbleData) {
      setName(editAbleData.name || "");
      setEmail(editAbleData.email || "");
      setPhone(editAbleData.phone || "");
      setCity(editAbleData.city || "");
      setStreet(editAbleData.street || "");
      setZip(editAbleData.zip || "");
    }
  }, [editAbleData]);

  return (
    <>
      <Dialog open={showDialog} onOpenChange={closeDialog}>
        <form onSubmit={handleAdd}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              {editAbleData?.name ? (
                <DialogTitle>Edit Address</DialogTitle>
              ) : (
                <DialogTitle>Create New Address</DialogTitle>
              )}
              <DialogDescription>Kindly Fill All the details</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="number"
                  placeholder="phone..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-right">
                  City
                </Label>
                <Input
                  id="city"
                  placeholder="city..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="street" className="text-right">
                  Street
                </Label>
                <Input
                  id="street"
                  placeholder="street..."
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="zip" className="text-right">
                  Zip
                </Label>
                <Input
                  id="zip"
                  type="number"
                  placeholder="zip..."
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Close
              </Button>
              <Button type="submit" onClick={handleAdd}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
