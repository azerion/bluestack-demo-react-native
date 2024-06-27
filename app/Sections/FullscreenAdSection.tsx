import { Text, TouchableOpacity, View } from "react-native";
import AdSectionStyle from "./AdSectionStyle";
import React from "react";


const FullscreenAdSection = (name: string, loadMethod: () => void, showMethod: () => void) => (
    <View style={AdSectionStyle.section}>
        <Text style={AdSectionStyle.sectionTitle}>{name} :</Text>
        <TouchableOpacity activeOpacity={0.8} style={AdSectionStyle.button}>
            <Text style={AdSectionStyle.buttonText} onPress={loadMethod}>
                Load Ad
            </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={AdSectionStyle.button}>
            <Text style={AdSectionStyle.buttonText} onPress={showMethod}>
                Show Ad
            </Text>
        </TouchableOpacity>
    </View>
)

export default FullscreenAdSection