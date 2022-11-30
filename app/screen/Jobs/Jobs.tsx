import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Text from "../../components/Text";
import {
  facebook,
  img1,
  imgP,
  instagram,
  linkedin,
  twitter,
} from "../../constants/base64";
import { i18nContext } from "../../context/i18nContext";
import { COLORS, SIZES } from "../../theme";

const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Jobs({ navigation }: any) {
  const [loading, setLoading] = React.useState<boolean>(false);

  const { bottom, top: paddingTop } = useSafeAreaInsets();
  const { i18n } = useContext(i18nContext);
  const [data, setData] = useState<any>({
    name: "",
    lastName: "",
    email: "",
    education: "",
    area: "",
    rol: "",
    location: "",
    experience: "",
    linkedinProfile: "",
    summary: "",
    privacy: false,
  });
  const [errors, setErrors] = useState<any>({});

  const clearData = () => {
    setData({
      name: "",
      lastName: "",
      email: "",
      education: "",
      area: "",
      rol: "",
      location: "",
      experience: "",
      linkedinProfile: "",
      summary: "",
      privacy: false,
    });
  };

  const runValidators = () => {
    for (const props in data) {
      if (
        props === "email" &&
        data[props] !== "" &&
        !props.toString().match(REGEX_EMAIL)
      )
        setErrors({ ...errors, email: "incorrectFormat" });
    }
  };

  const validateForm = () => {
    setErrors({});
    for (const props in data) {
      if (data[props] === "" && props.toString() !== "linkedinProfile") {
        const error = (errors[props] = "requireField");
        setErrors({ ...errors, error });
      }
    }
    runValidators();

    delete errors.error;
    for (const props in errors) {
      if (errors[props] !== "") {
        return false;
      }
    }

    return true;
  };

  const findJob = () => {
    const isValid = validateForm();
    const html = `
          <body class='body' style='padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#ffffff; -webkit-text-size-adjust:none;'>
                
          <style type="text/css" media="screen">
            /* Linked Styles */
            body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#ffffff; -webkit-text-size-adjust:none }
            a { color:#0000ee; text-decoration:none }
            p { padding:0 !important; margin:0 !important } 
            img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
            .mcnPreviewText { display: none !important; }

            .cke_editable,
            .cke_editable a,
            .cke_editable span,
            .cke_editable a span { color: #000001 !important; }		
            /* Mobile styles */
            @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
              .mobile-shell { width: 100% !important; min-width: 100% !important; }
              .bg { background-size: 100% auto !important; -webkit-background-size: 100% auto !important; }
              
              .text-header,
              .m-center { text-align: center !important; }
              
              .center { margin: 0 auto !important; }
              .container { padding: 20px 10px !important }
              
              .td { width: 100% !important; min-width: 100% !important; }

              .m-br-15 { height: 15px !important; }
              .p30-15 { padding: 30px 15px !important; }
              .p0-15-30 { padding: 0px 15px 30px 15px !important; }
              .p0-15 { padding: 0px 15px !important; }
              .mpb30 { padding-bottom: 30px !important; }
              .mpb15 { padding-bottom: 15px !important; }

              .m-td,
              .m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }

              .m-block { display: block !important; }

              .fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }

              .column,
              .column-dir,
              .column-top,
              .column-empty,
              .column-empty2,
              .column-dir-top { float: left !important; width: 100% !important; display: block !important; }

              .column-empty { padding-bottom: 30px !important; }
              .column-empty2 { padding-bottom: 10px !important; }

              .content-spacing { width: 15px !important; }
            }
          </style>
          <span class='mcnPreviewText' style='display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;'>*|MC_PREVIEW_TEXT|*</span>
        
        <table width='100%' border='0' cellspacing='0' cellpadding='0' bgcolor='#ffffff'>
          <tr>
            <td align='center' valign='top'>
              <!-- Header -->
              <table width='100%' border='0' cellspacing='0' cellpadding='0'>
                <tr>
                  <td align='center'>
                    <table width='650' border='0' cellspacing='0' cellpadding='0' class='mobile-shell'>
                      <tr>
                        <td class='td' style='width:650px; min-width:650px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;'>
                          <!-- Header -->
                          <table width='100%' border='0' cellspacing='0' cellpadding='0'>
                            <tr>
                              <td class='p30-15 tbrr' style='padding: 30px 0px 40px 0px; border-radius:12px 12px 0px 0px;'>
                                <table width='100%' border='0' cellspacing='0' cellpadding='0'>
                                  <tr>
                                    <th class='column-top' width='145' style='font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;'>
                                      <table width='100%' border='0' cellspacing='0' cellpadding='0'>
                                        <tr>
                                          <td class='img m-center' style='font-size:0pt; line-height:0pt; text-align:left;'><img src='https://i0.wp.com/legalenusa.com/wp-content/uploads/2021/12/Legal-en-USA-Logo-a-color.png?fit=131%2C65&ssl=1' width='100' height='56' mc:edit='image_1' border='0' alt='' /></td>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <div mc:repeatable='Select' mc:variant='Hero'>
                            <table width='100%' border='0' cellspacing='0' cellpadding='0'>
                              <tr>
                                <td class='fluid-img' style='font-size:0pt; line-height:0pt; text-align:left;'><img src='${imgP}' width='650' height='366' mc:edit='image_2' style='max-width:650px;' border='0' alt='' /></td>
                              </tr>
                              <tr>
                                <td class='p30-15' style='padding: 40px 0px 40px 0px;'>
                                  <table width='100%' border='0' cellspacing='0' cellpadding='0'>
                                    <tr>
                                      <td class='h3 pb15' style='color:#000000; font-family:Arial, sans-serif; font-size:22px; line-height:32px; text-align:left; padding-bottom:15px;'><div mc:edit='text_2'>Solicitud de búsqueda de trabajo</div></td>
                                    </tr>
                                    <tr>
                                      <td class='text pb15' style='color:#666666; font-family:Arial, sans-serif; font-size:15px; line-height:28px; text-align:left; padding-bottom:15px;'><div mc:edit='text_3'>Se ha realiado una nueva solicitud de empleo por parte del usuario ${
                                        data.name
                                      } ${
      data.lastName
    } con la siguiente información.</div></td>
                                    </tr>
                                    <tr>
                                      <td class='text pb15' style='color:#666666; font-family:Arial, sans-serif; font-size:15px; line-height:28px; text-align:left; padding-bottom:15px;'><div mc:edit='text_3'>
                                      <h7><span style='font-weight: bold'>Email:</span> ${
                                        data.email
                                      }</h7><br>
                                      <h7><span style='font-weight: bold'>Eduación:</span> ${
                                        data.education
                                      }</h7><br>
                                      <h7><span style='font-weight: bold'>Área:</span> ${
                                        data.area
                                      }</h7><br>
                                      <h7><span style='font-weight: bold'>Rol:</span> ${
                                        data.rol
                                      }</h7><br>
                                      <h7><span style='font-weight: bold'>Ubicación:</span> ${
                                        data.location
                                      }</h7><br>
                                      <h7><span style='font-weight: bold'>Experiencia:</span> ${
                                        data.experience
                                      }</h7><br>
                                      <h7><span style='font-weight: bold'>Perfil Linkedin:</span> ${
                                        data.linkedinProfile
                                          ? data.linkedinProfile
                                          : "-"
                                      }</h7><br>
                                      <h7><span style='font-weight: bold'>Resúmen:</span> ${
                                        data.summary
                                      }</h7><br>
                                      </div></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td height='1' bgcolor='#e5e5e5' class='img' style='font-size:0pt; line-height:0pt; text-align:left;'>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class='pb40' style='padding-bottom:40px;'></td>
                              </tr>
                            </table>
                          </div>
                          
                          <table width='100%' border='0' cellspacing='0' cellpadding='0'>
                            <tr>
                              <td class='p0-15-30'>
                                <table width='100%' border='0' cellspacing='0' cellpadding='0'>
                                  <tr>
                                    <td align='center'>
                                      <table border='0' cellspacing='0' cellpadding='0'>
                                        <tr>
                                          <td class='img'>
                                          <a style='margin-left: 10px' href='https://www.facebook.com/EduardoSotoInmigracion/' target='_blank'><img src='${facebook}' width='32' height='32' mc:edit='image_7'  border='0' alt='' /></a>
                                          <a style='margin-left: 10px' href='https://twitter.com/Legalenusa' target='_blank'><img src='${twitter}' width='32' height='32' mc:edit='image_8' alt='' /></a>
                                          <a style='margin-left: 10px' href='https://www.instagram.com/InmigracionAbogado/' target='_blank'><img src='${instagram}' width='32' height='32' mc:edit='image_9' alt='' /></a>
                                        </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class='text-footer1 pb10' style='color:#777777; font-family:Arial, sans-serif; font-size:14px; line-height:20px; text-align:center; padding-bottom:10px;'><div mc:edit='text_29'>LegalInUsa - Departamento de Asesoría Legal en los Estados Unidos</div></td>
                                  </tr>
                                  <tr>
                                    <td class='text-footer2 pb20' style='color:#777777; font-family:Arial, sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:20px;'><div mc:edit='text_30'>Direccion de la Compañía</div></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>`;

    if (isValid) {
      setLoading(true);
      axios
        .post(
          "https://us-central1-legalenusa-173c7.cloudfunctions.net/mailer",
          {
            subject: "Solicitud de trabajo.",
            from: data.email,
            to: "info@legalenusa.com",
            text: html,
          }
        )
        .then((res) => {
          navigation.navigate("FormSubmitted");
          setLoading(false);
          setErrors({});
          clearData();
        })
        .catch((e) => {
          if (e.message === "Network Error") {
            // this.makeOneTimePayment(order_type, apt_id);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const handleData = (prop: string, e: any) => {
    if (prop === "experience" && isNaN(e)) return false;
    setData({ ...data, [prop]: e });

    if (e.length !== 0) {
      delete errors[prop];
      setErrors(errors);
    } else {
      const error = (errors[prop] = "requireField");
    }
  };

  useEffect(() => {
    setErrors({});
  }, []);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Header title="findAJob" />
        <Spinner
          animation="fade"
          overlayColor={COLORS.blackOpacity}
          visible={loading}
          textContent={i18n.t("loading")}
          textStyle={styles.spinnerTextStyle}
        />

        <View style={{ flex: 1 }}>
          <ScrollView
            contentInset={{
              bottom: bottom + 100,
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginTop: SIZES.s }}
            scrollEventThrottle={200}
          >
            <View style={{ marginHorizontal: SIZES.xl }}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={require("../../../assets/images/interview.png")}
                />
                <Text
                  align="center"
                  primary
                  weight="bold"
                  style={{ marginVertical: 20 }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  dictum, eros quis sodales aliquam, orci augue egestas mi, et
                  blandit nibh tortor quis est.
                </Text>
              </View>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                  <View>
                    <Input
                      textContentType="name"
                      onChangeText={(e) => handleData("name", e)}
                      value={data.name}
                      label={i18n.t("name")}
                      placeholderTextColor={COLORS.gray}
                      style={{
                        borderRadius: 12,
                        ...(errors["name"]
                          ? { borderWidth: 1, borderColor: "red" }
                          : {}),
                      }}
                    />
                    {errors["name"] && (
                      <Text h4 color={COLORS.red2}>
                        {i18n.t(errors["name"])}
                      </Text>
                    )}
                  </View>

                  <View>
                    <Input
                      onChangeText={(e) => handleData("lastName", e)}
                      value={data.lastName}
                      label={i18n.t("lastName")}
                      placeholderTextColor={COLORS.gray}
                      style={{
                        borderRadius: 12,
                        ...(errors["lastName"]
                          ? { borderWidth: 1, borderColor: "red" }
                          : {}),
                      }}
                    />
                    {errors["lastName"] && (
                      <Text h4 color={COLORS.red2}>
                        {i18n.t(errors["lastName"])}
                      </Text>
                    )}
                  </View>

                  <View>
                    <Input
                      keyboardType="email-address"
                      onChangeText={(e) => handleData("email", e)}
                      value={data.email}
                      label={i18n.t("email")}
                      placeholderTextColor={COLORS.gray}
                      style={{
                        borderRadius: 12,
                        ...(errors["email"]
                          ? { borderWidth: 1, borderColor: "red" }
                          : {}),
                      }}
                    />
                    {errors["email"] && (
                      <Text h4 color={COLORS.red2}>
                        {i18n.t(errors["email"])}
                      </Text>
                    )}
                  </View>

                  <View>
                    <Input
                      onChangeText={(e) => handleData("education", e)}
                      value={data.education}
                      label={i18n.t("education")}
                      placeholderTextColor={COLORS.gray}
                      style={{
                        borderRadius: 12,
                        ...(errors["education"]
                          ? { borderWidth: 1, borderColor: "red" }
                          : {}),
                      }}
                    />
                    {errors["education"] && (
                      <Text h4 color={COLORS.red2}>
                        {i18n.t(errors["education"])}
                      </Text>
                    )}
                  </View>

                  <View>
                    <Input
                      onChangeText={(e) => handleData("area", e)}
                      value={data.area}
                      label={i18n.t("area")}
                      placeholderTextColor={COLORS.gray}
                      style={{
                        borderRadius: 12,
                        ...(errors["area"]
                          ? { borderWidth: 1, borderColor: "red" }
                          : {}),
                      }}
                    />
                    {errors["area"] && (
                      <Text h4 color={COLORS.red2}>
                        {i18n.t(errors["area"])}
                      </Text>
                    )}
                  </View>

                  <View>
                    <Input
                      onChangeText={(e) => handleData("rol", e)}
                      value={data.rol}
                      label={i18n.t("rol")}
                      placeholderTextColor={COLORS.gray}
                      style={{
                        borderRadius: 12,
                        ...(errors["rol"]
                          ? { borderWidth: 1, borderColor: "red" }
                          : {}),
                      }}
                    />
                    {errors["rol"] && (
                      <Text h4 color={COLORS.red2}>
                        {i18n.t(errors["rol"])}
                      </Text>
                    )}
                  </View>

                  <View>
                    <Input
                      onChangeText={(e) => handleData("location", e)}
                      value={data.location}
                      label={i18n.t("location")}
                      placeholderTextColor={COLORS.gray}
                      style={{
                        borderRadius: 12,
                        ...(errors["location"]
                          ? { borderWidth: 1, borderColor: "red" }
                          : {}),
                      }}
                    />
                    {errors["location"] && (
                      <Text h4 color={COLORS.red2}>
                        {i18n.t(errors["location"])}
                      </Text>
                    )}
                  </View>

                  <View>
                    <Input
                      keyboardType="numeric"
                      onChangeText={(e) => handleData("experience", e)}
                      value={data.experience}
                      label={i18n.t("yearsOfExperience")}
                      placeholderTextColor={COLORS.gray}
                      style={{
                        borderRadius: 12,
                        ...(errors["experience"]
                          ? { borderWidth: 1, borderColor: "red" }
                          : {}),
                      }}
                    />
                    {errors["experience"] && (
                      <Text h4 color={COLORS.red2}>
                        {i18n.t(errors["experience"])}
                      </Text>
                    )}
                  </View>

                  <View>
                    <Input
                      keyboardType="url"
                      onChangeText={(e) => handleData("linkedinProfile", e)}
                      value={data.linkedinProfile}
                      label={i18n.t("linkedinProfile")}
                      placeholderTextColor={COLORS.gray}
                      style={{
                        borderRadius: 12,
                      }}
                    />
                  </View>

                  <View>
                    <Input
                      multiline
                      onChangeText={(e) => handleData("summary", e)}
                      value={data.summary}
                      label={i18n.t("summary")}
                      placeholderTextColor={COLORS.gray}
                      style={{
                        height: 150,
                        paddingTop: 10,
                        ...(errors["summary"]
                          ? { borderWidth: 1, borderColor: "red" }
                          : {}),
                      }}
                    />
                    {errors["summary"] && (
                      <Text h4 color={COLORS.red2}>
                        {i18n.t(errors["summary"])}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={{ marginHorizontal: -SIZES.s }}>
                <Button
                  style={styles.button}
                  title={i18n.t("submit")}
                  onPress={findJob}
                />
              </View>
            </View>
            <View></View>
            <Pressable onPress={() => navigation.navigate("Privacy")}>
              <Text
                primary
                align="center"
                style={{ marginHorizontal: SIZES.xl, marginBottom: 50 }}
              >
                * {i18n.t("privacyPolicy")}
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  textHeader: {
    fontSize: 48,
    color: COLORS.primary,
  },
  subheader: {
    fontSize: 30,
    color: COLORS.primary,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "cover",
    alignContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  button: {
    backgroundColor: COLORS.blue,
    borderRadius: 12,
    width: "100%",
    paddingHorizontal: -SIZES.xl,
    marginTop: 30,
    marginBottom: 20,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
